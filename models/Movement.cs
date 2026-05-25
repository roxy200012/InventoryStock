public class Movement
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Type { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public DateTime Date { get; set; }   // <-- CORRETTO
}
