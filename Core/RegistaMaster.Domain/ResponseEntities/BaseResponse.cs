using RegistaMaster.Domain.Enums;

namespace RegistaMaster.Domain.ResponseEntities;

public class BaseResponse<T>
{
    public string Title { get; set; }
    public string Message { get; set; }
    public ResultStatus ResultStatus { get; set; }
    public T ResultObject { get; set; }
    public ICollection<T> ResultObjects { get; set; }
    public string Url { get; set; }
}
