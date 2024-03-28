using RegistaMaster.Application.Repositories;
using RegistaMaster.Application.Services.EmailService;
using RegistaMaster.Domain.DTOModels.EmailModels;
using RegistaMaster.Domain.DTOModels.SecurityModels;
using RegistaMaster.Domain.Entities;
using System.Net.Mail;
using System.Net.Mime;
using System.Net;
using Microsoft.AspNetCore.Http;
using RegistaMaster.Persistance.RegistaMasterContextes;

namespace RegistaMaster.Infasctructure.Services.EmailService;

public class EmailService : IEmailService
{
  private readonly IHttpContextAccessor httpContextAccessor;

  private readonly RegistaMasterContext context;

  private readonly SessionModel session;

  private readonly IUnitOfWork uow;

  public EmailService(IHttpContextAccessor _httpContextAccessor)
  {
    httpContextAccessor = _httpContextAccessor;
  }

  public bool Send(EmailSendDto email, Customer UserWhitCustomer)
  {
    try
    {
      var customerEmailInfo = uow.Repository.GetNonDeletedAndActive<EmailInformation>(t => t.CustomerID == UserWhitCustomer.ID).FirstOrDefault();
      MailMessage mm = new MailMessage();
      mm.From = new MailAddress(customerEmailInfo?.ContactEmail ?? "", "Bildirim Mail");
      mm.To.Add(email.To);
      if (email.CCes != null)
      {
        foreach (var item in email.CCes)
        {
          mm.CC.Add(item);
        }
      }
      mm.Subject = email.Subject;
      if (!string.IsNullOrEmpty(email.AttachmentUrl))
      {
        Attachment data = new Attachment(email.AttachmentUrl, MediaTypeNames.Application.Octet);
        mm.Attachments.Add(data);
      }

      mm.IsBodyHtml = true;
      mm.Body = email.Body;
      SmtpClient smtp = new SmtpClient(customerEmailInfo.ContactEmail);
      smtp.Host = customerEmailInfo.EmailHost;
      smtp.Port = Convert.ToInt32(customerEmailInfo.EmailPort);
      smtp.EnableSsl = customerEmailInfo.EnableSsl;
      NetworkCredential nc = new NetworkCredential(customerEmailInfo.ContactEmail, customerEmailInfo.EmailPassword);//Emaili Gönderen Hesap

      smtp.Credentials = nc;
      System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate (object s,
      System.Security.Cryptography.X509Certificates.X509Certificate certificate,
      System.Security.Cryptography.X509Certificates.X509Chain chain,
      System.Net.Security.SslPolicyErrors sslPolicyErrors)
      {
        return true;
      };

      smtp.Send(mm);
      return true;
    }
    catch (Exception e)
    {
      throw e;
    }
  }

}
