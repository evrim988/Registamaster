using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.EmailService;
using RegistaMaster.Domain.DTOModels.EmailModels;
using RegistaMaster.Domain.DTOModels.ResponsibleHelperModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Persistance.RegistaMasterContextes;
using Task = RegistaMaster.Domain.Entities.Task;

namespace RegistaMaster.Infasctructure.Repositories;

public class TaskRepository : Repository, ITaskRepository
{
    private readonly RegistaMasterContext context;
    private readonly SessionModel session;
    private readonly IUnitOfWork uow;
    private readonly IEmailService emailService;

    public TaskRepository(RegistaMasterContext _context, SessionModel _session, IUnitOfWork _uow, IEmailService _emailService) : base(_context, _session)
    {
        context = _context;
        session = _session;
        uow = _uow;
        emailService = _emailService;
    }

    public async Task<IQueryable<Task>> Getlist()
    {
        var model = GetNonDeletedAndActive<Task>(t => true);
        return model;
    }

    public async Task<string> AddTask(Task model)
    {
        try
        {
            model.CustomerID = session.CustomerID;
            await uow.Repository.Add(model);
            await uow.SaveChanges();
            return "";
        }
        catch (Exception e)
        {
            throw e;
        }

    }
    public async Task<string> TaskUpdate(Task model)
    {
        Update(model);
        await uow.SaveChanges();
        return "";
    }
    public void Delete(int id)
    {
        var task = GetNonDeletedAndActive<Task>(t => t.ID == id);
        DeleteRange(task.ToList());
        Delete<Customer>(id);
    }

    public async Task<string> SendMail(Task task)
    {
        try
        {
            //var UserCustomer = await GetByID<User>(user.ID);
            var UserCustomer = context.Users.Include(t => t.Customer).FirstOrDefault(t => t.ID == session.ID);
            var customer = await GetById<Customer>(task.CustomerID);


            EmailSendDto email = new EmailSendDto();
            email.To = "evrim@etkinbilgi.com";
            email.Body = "Bildirim : " + task.Title + " / " + task.Description;
            email.Subject = "Yeni Bildirim";

            emailService.Send(email, customer);

            return "1";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<List<SelectListItem>> ResponsiblehelperModelList()
    {
        try
        {
            return GetNonDeletedAndActive<User>(t => true)
                .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.Name + " " + s.Surname }).ToList();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public async Task<List<SelectListItem>> RequestModelList()
    {
        try
        {
            return GetNonDeletedAndActive<Request>(t => true)
                .Select(s => new SelectListItem { Value = s.ID.ToString(), Text = s.RequestSubject }).ToList();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public async Task<IQueryable<Task>> GetMyTaskUserID()
    {
        try
        {
            var model = GetNonDeletedAndActive<Task>(t => t.ResponsibleID == session.ID);
            return model;
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<string> MyTaskUpdate(int Key, string values)
    {
        try
        {
            var TaskModel = context.Tasks.FirstOrDefault(t => t.ID == Key);

            var task = JsonConvert.DeserializeObject<Task>(values);

            if (task.TaskStatus != null)
                TaskModel.TaskStatus = task.TaskStatus;

            return "1";
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<List<ResponsibleDevextremeSelectListHelper>> GetRequest()
    {
        try
        {
            List<ResponsibleDevextremeSelectListHelper> ResponsibleHelpers = new List<ResponsibleDevextremeSelectListHelper>();
            var model = context.Requests
                .Where(t => true);
            foreach (var item in model)
            {
                ResponsibleDevextremeSelectListHelper helper = new ResponsibleDevextremeSelectListHelper()
                {
                    ID = item.ID,
                    Name = item.RequestSubject,
                };
                ResponsibleHelpers.Add(helper);
            }
            return ResponsibleHelpers;
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}
