using RegistaMaster.Domain.DTOModels.SelectModels;
using RegistaMaster.Domain.Entities;
using System.Linq.Expressions;
using System.Net.Sockets;

namespace RegistaMaster.Application.Repositories;

public interface IRepository
{
    Task<T> Add<T>(T _object) where T : BaseEntitiy;
    T Update<T>(T _object) where T : BaseEntitiy;
    Task<T> Delete<T>(int id) where T : BaseEntitiy;
    Task<T> GetById<T>(int id) where T : BaseEntitiy;
    IQueryable<T> GetList<T>(Expression<Func<T, bool>> where) where T : BaseEntitiy;
    IQueryable<T> GetNonDeletedAndActive<T>(Expression<Func<T, bool>> expression) where T : BaseEntitiy;

    List<SelectModel> GetEnumSelect<E>();
    string GetDisplayValue<E>(E value);
    string lookupResource(Type resourceManagerProvider, string resourceKey);
}
