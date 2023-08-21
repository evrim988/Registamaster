using RegistaMaster.Domain.DTOModels.EmailModels;
using RegistaMaster.Domain.Entities;

namespace RegistaMaster.Application.Services.EmailService;

public interface IEmailService
{
    bool Send(EmailSendDto email, Customer UserWhitCustomer);

}
