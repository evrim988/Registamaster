namespace RegistaMaster.Domain.Exceptions;

public class UnAuth : Exception
{
    public UnAuth(string message) : base(message)
    {

    }
    public UnAuth(String message, Exception innerException) : base(message, innerException)
    {

    }

    public override string ToString()
    {
        return Message;
    }
}
