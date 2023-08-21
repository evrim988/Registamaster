namespace RegistaMaster.Domain.DTOModels.EmailModels;

public class EmailSendDto
{
    public string Name { get; set; }

    public string To { get; set; }

    public List<string> CCes { get; set; }

    public string Body { get; set; }

    public string Subject { get; set; }

    public string AttachmentUrl { get; set; }
}
