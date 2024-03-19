using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RegistaMaster.Application.Repositories;
using RegistaMaster.Domain.DTOModels.Entities.UserModel;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using RegistaMaster.Domain.Enums;

namespace RegistaMaster.WebApp.Controllers;

public class UserController : Controller
{
    private readonly IUnitOfWork uow;
    private readonly SessionModel session;
    public UserController(IUnitOfWork _uow)
    {
        uow = _uow;
        session = _uow.GetSession();
    }
    public async Task<object> GetList(DataSourceLoadOptions options)

    {
        var models = await uow.UserRepository.GetList();
        return DataSourceLoader.Load(models, options);
    }
    public IActionResult Index()
    {
        return View();
    }
   //public async Task<IActionResult> AddUser(string values)
   //{
   //    try
   //    {
   //        var model = JsonConvert.DeserializeObject<User>(values);
   //        await uow.UserRepository.AddUser(model);
   //        return Ok();
   //    }
   //    catch (Exception e)
   //    {

   //        throw e;
   //    }
   //}
   public async Task<string> UserEdit(int Key, string values)//
   {
      try
      {
         var size = await uow.Repository.GetById<User>(Key);
         JsonConvert.PopulateObject(values, size);
         uow.UserRepository.Update(size);
         await uow.SaveChanges();
         return "1";
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   [HttpGet]
    public async Task<IActionResult> UserDetail()//
    {
        try
        {
            var model = await uow.UserRepository.GetById<User>(uow.GetSession().ID);

            var userdetail = new UserDTO()
            {
                UserName = model.Username,
                Name = model.Name,
                Surname = model.Surname,
                Password = model.Password,
                Email = model.Email,
                AuthorizationStatus=model.AuthorizationStatus,
            };

            return View(userdetail);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [HttpPost]
    public async Task<IActionResult> UserDetail(UserDTO userDetail)
    {
        try
        {
            var model = await uow.UserRepository.GetById<User>(uow.GetSession().ID);

            model.Username = userDetail.UserName;
            model.Name = userDetail.Name;
            model.Password = userDetail.Password;
            model.Email = userDetail.Email;
            model.AuthorizationStatus = userDetail.AuthorizationStatus;
            uow.UserRepository.Update<User>(model);
            await uow.SaveChanges();


            return RedirectToAction("Login", "Security");
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    
    public async Task<IActionResult> UserDetails(int ID)//
    {
        try
        {
            var model = await uow.UserRepository.UserDetails(ID);
            return View(model);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [HttpPost]
    public async Task<IActionResult> UserDetails(UserDetailDto userDetail)//
    {
        try
        {

            return Ok();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [HttpGet]
    public async Task<IActionResult> Create()//
    {
        var model = new UserDetailDto();
        return View(model);
    }
    [HttpPost]
    public async Task<IActionResult> Create(UserDetailDto userDetailDto)//
    {
        var user = new User()
        {
            Name = userDetailDto.Name,
            Surname = userDetailDto.Surname,
            Username = userDetailDto.Username,
            Email = userDetailDto.Email,
            Password = userDetailDto.Password,
            Image = userDetailDto.Image,
            AuthorizationStatus=userDetailDto.AuthorizationStatus,
        };

        await uow.UserRepository.AddUser(user);

        await uow.SaveChanges();

        return RedirectToAction("Index", "User");

    }
    public async Task<string> FileUpload(IFormFile FileUrl)
    {
        try
        {
            string fileName = "";
            if (FileUrl != null)
            {
                string extension = Path.GetExtension(FileUrl.FileName);
                Guid guidFile = Guid.NewGuid();
                fileName = "user" + guidFile + extension;
                var path = Path.Combine("wwwroot/Modernize/Img/ProfilePhotos/", fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    FileUrl.CopyTo(stream);
                }
            }
            return fileName;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    public async Task<IActionResult> GetAuthStatus()
    {
        try
        {
            var models = uow.Repository.GetEnumSelect<AuthorizationStatus>();
            var resultJson = JsonConvert.SerializeObject(models);
            return Content(resultJson, "application/json");
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

   [HttpPost]
   public async Task<string> AddUser(User model)
   {
      try
      {
         await uow.UserRepository.AddUser(model);
         return "1";
      }
      catch (Exception ex)
      {
         throw ex;
      }
   }

   public async Task<string> UpdateUser(UserDetailDto model)
    {
        try
        {
            return await uow.UserRepository.UpdateUser(model);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<string> ChangeAuthorization(UserDetailDto model)
    {
        try
        {
            return await uow.UserRepository.ChangeAuthorization(model);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public async Task<string> DeleteUser(int ID)
    {
        try
        {
            await uow.UserRepository.DeleteUser(ID);
            return "1";
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
