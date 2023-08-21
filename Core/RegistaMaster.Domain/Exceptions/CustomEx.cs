namespace RegistaMaster.Domain.Exceptions;

public class CustomEx : Exception
{
    public CustomEx(string message) : base(message)
    {

    }
    public CustomEx(string message, Exception innerException) : base(message, innerException)
    {

    }

    public override string ToString()
    {
        return Message;
    }
}
