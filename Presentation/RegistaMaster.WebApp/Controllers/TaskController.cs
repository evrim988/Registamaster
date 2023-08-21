using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.TaskModel;
using RegistaMaster.Domain.Enums;
using Task = RegistaMaster.Domain.Entities.Task;
using TaskStatus = RegistaMaster.Domain.Enums.TaskStatus;

namespace RegistaMaster.WebApp.Controllers;

public class TaskController : Controller
{
    private readonly IUnitOfWork uow;
    private IWebHostEnvironment env;
    public TaskController(IUnitOfWork _uow, IWebHostEnvironment _env)
    {
        uow = _uow;
        env = _env;
    }
    public IActionResult Index()
    {
        return View();
    }


    [HttpGet]
    public async Task<IActionResult> Create()
    {
        var model = new TaskDto();
        model.ResponsiblehelperModelList = await uow.TaskRepository.ResponsiblehelperModelList();
        model.RequestModelList = await uow.TaskRepository.RequestModelList();
        model.PlanedStart = DateTime.Now;
        return View(model);
    }


    [HttpPost]
    public async Task<string> Create(TaskDto model)
    {
        try
        {

            var fileName = "";

            if (model.Base64 != null)
                fileName = await GetBase64(model.Base64);

            var task = new Task()
            {
                CustomerID = uow.GetSession().ID,
                PlanedStart = DateTime.Now,
                PlanedEnd = DateTime.Now.AddDays(7),
                Title = model.Title,
                Description = model.Description,
                ResponsibleID = model.ResponsibleID,
                Image = fileName,
                TaskStatus = TaskStatus.NotStart,
                PriorityStatus = PriorityStatus.low,
                RequestID = model.RequestID
            };
            await uow.TaskRepository.AddTask(task);

            await uow.SaveChanges();

            var email = await uow.TaskRepository.SendMail(task);

            return "1";
        }
        catch (Exception ex)
        {
            throw;
        }
        return "1";
    }
    public async Task<string> GetBase64(string base64)
    {
        try
        {
            string webRootPath = env.WebRootPath;
            var ımageString = base64.Split(',');
            Guid guidFile = Guid.NewGuid();
            string fileName = string.Format("Task" + guidFile + ".jpg");
            var path = Path.Combine(webRootPath + "\\Modernize\\Img\\TaskFiles\\", fileName);

            var bytes = Convert.FromBase64String(ımageString[1]);
            using (var imageFile = new FileStream(path, FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }


            return fileName;

        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<object> GetList(DataSourceLoadOptions options)
    {
        var models = await uow.TaskRepository.Getlist();
        return DataSourceLoader.Load(models, options);
    }
    //public async Task<IActionResult> AddTask(string values)
    //{
    //    try
    //    {

    //        var model = JsonConvert.DeserializeObject<Task>(values);
    //        model.PlanedEnd = DateTime.Now.AddDays(7);
    //        await uow.taskRepository.AddTask(model);
    //        var email = await uow.taskRepository.SendMail(model);
    //        return Ok();
    //    }
    //    catch (Exception e)
    //    {
    //        throw e;
    //    }

    //}
    public async Task<string> TaskUpdate(int Key, string values)
    {
        var size = await uow.TaskRepository.GetById<Task>(Key);
        JsonConvert.PopulateObject(values, size);
        uow.TaskRepository.Update(size);
        await uow.SaveChanges();
        return "1";
    }
    public async Task<string> Delete(int Key)
    {
        try
        {
            await uow.TaskRepository.Delete<Task>(Key);
            await uow.SaveChanges();
            return "1";

        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<object> GetResponsible(DataSourceLoadOptions loadOptions)
    {
        try
        {
            var responsibleHelpers = await uow.UserRepository.GetResponsible();
            return DataSourceLoader.Load(responsibleHelpers, loadOptions);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public async Task<ActionResult> GetTaskStatus()
    {
        try
        {
            var models = uow.Repository.GetEnumSelect<TaskStatus>();
            var resultJson = JsonConvert.SerializeObject(models);
            return Content(resultJson, "application/json");
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<IActionResult> GetPriorityStatus()
    {
        try
        {
            var models = uow.Repository.GetEnumSelect<PriorityStatus>();
            var resultJson = JsonConvert.SerializeObject(models);
            return Content(resultJson, "application/json");
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public IActionResult MyTask()
    {
        return View();
    }
    public async Task<object> GetMyTaskUserID(DataSourceLoadOptions options)

    {
        var models = await uow.TaskRepository.GetMyTaskUserID();
        return DataSourceLoader.Load(models, options);
    }

    [HttpPut]
    public async Task<object> MyTaskUpdate(int Key, string values)
    {
        var model = await uow.TaskRepository.MyTaskUpdate(Key, values);
        if (model == "1")
            await uow.SaveChanges();

        return Ok();
    }
    public async Task<object> GetRequest(DataSourceLoadOptions loadOptions)
    {
        try
        {
            var responsibleHelpers = await uow.TaskRepository.GetRequest();
            return DataSourceLoader.Load(responsibleHelpers, loadOptions);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
