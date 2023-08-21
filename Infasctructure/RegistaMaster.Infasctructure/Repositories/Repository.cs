using Microsoft.EntityFrameworkCore;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.DTOModels.SelectModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;
using RegistaMaster.Persistance.RegistaMasterContextes;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Reflection;

namespace RegistaMaster.Infasctructure.Repositories;

public class Repository : IRepository
{
    public readonly RegistaMasterContext context;

    public readonly SessionModel session;
    public Repository(RegistaMasterContext _context, SessionModel _session)
    {
        context = _context;
        session = _session;
    }
    private DbSet<T> GetTable<T>() where T : BaseEntitiy
    {
        return context.Set<T>();
    }
    public async Task<T> Find<T>(Expression<Func<T, bool>> where) where T : BaseEntitiy
    {
        try
        {
            return await GetTable<T>().FirstOrDefaultAsync(where);
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async System.Threading.Tasks.Task UpdateRange<T>(ICollection<T> _objectList) where T : BaseEntitiy
    {
        try
        {
            foreach (var item in _objectList)
            {
                item.LastModifiedOn = DateTime.Now;
            }
            GetTable<T>().UpdateRange(_objectList);
        }
        catch (Exception e)
        {

            throw e;
        }
    }
    public async void DeleteRange<T>(ICollection<T> _objectList) where T : BaseEntitiy
    {
        try
        {
            foreach (var item in _objectList)
            {
                item.ObjectStatus = ObjectStatus.Deleted;
                item.Status = Status.Passive;
            }
            await UpdateRange(_objectList);
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public IQueryable<T> GetNonDeletedAndActive<T>(Expression<Func<T, bool>> expression) where T : BaseEntitiy
    {
        try
        {
            return GetQueryable<T>(t => t.ObjectStatus == ObjectStatus.NonDeleted && t.Status == Status.Active)
                .Where(expression);
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<T> Add<T>(T _object) where T : BaseEntitiy
    {
        _object.CreatedBy = session.ID;
        _object.LastModifiedBy = session.FullName;
        _object.LastModifiedOn = DateTime.Now;
        _object.CreatedOn = DateTime.Now;
        _object.Status = Status.Active;
        _object.ObjectStatus = ObjectStatus.NonDeleted;
        await GetTable<T>().AddAsync(_object);
        return _object;
    }

    public async Task<T> Delete<T>(int id) where T : BaseEntitiy
    {
        var obj = await Find<T>(t => t.ID == id);
        await Delete<T>(obj);
        return obj;
    }
    public async Task<T> Delete<T>(T model) where T : BaseEntitiy
    {
        try
        {
            model.ObjectStatus = ObjectStatus.Deleted;
            model.Status = Status.Passive;
            Update<T>(model);
            return model;
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public IQueryable<T> GetQueryable<T>(Expression<Func<T, bool>> where) where T : BaseEntitiy
    {
        return GetTable<T>().Where(where);
    }

    public T Update<T>(T _object) where T : BaseEntitiy
    {
        _object.LastModifiedOn = DateTime.Now;
        GetTable<T>().Update(_object);
        return _object;
    }

    public async Task<T> GetById<T>(int id) where T : BaseEntitiy
    {
        return await Find<T>(t => t.ID == id);
    }

    public IQueryable<T> GetList<T>(Expression<Func<T, bool>> where) where T : BaseEntitiy
    {
        return GetTable<T>().Where(where);
    }

    public List<SelectModel> GetEnumSelect<E>()
    {
        try
        {
            return (Enum.GetValues(typeof(E)).Cast<E>().Select(e => new SelectModel() { Text = GetDisplayValue<E>(e), Value = e.ToString(), Id = Convert.ToInt32(e) })).ToList();

        }
        catch (Exception e)
        {

            throw e;
        }
    }
    public string GetDisplayValue<E>(E value)
    {
        var fieldInfo = value.GetType().GetField(value.ToString());

        var descriptionAttributes = fieldInfo.GetCustomAttributes(
                typeof(DisplayAttribute), false) as DisplayAttribute[];

        if (descriptionAttributes[0].ResourceType != null)
            return lookupResource(descriptionAttributes[0].ResourceType, descriptionAttributes[0].Name);

        if (descriptionAttributes == null) return string.Empty;
        return (descriptionAttributes.Length > 0) ? descriptionAttributes[0].Name : value.ToString();
    }
    public string lookupResource(Type resourceManagerProvider, string resourceKey)
    {
        foreach (PropertyInfo staticProperty in resourceManagerProvider.GetProperties(BindingFlags.Static | BindingFlags.NonPublic | BindingFlags.Public))
        {
            if (staticProperty.PropertyType == typeof(System.Resources.ResourceManager))
            {
                System.Resources.ResourceManager resourceManager = (System.Resources.ResourceManager)staticProperty.GetValue(null, null);
                return resourceManager.GetString(resourceKey);
            }
        }

        return resourceKey; // Fallback with the key name
    }
}
