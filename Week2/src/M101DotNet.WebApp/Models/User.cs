namespace M101DotNet.WebApp.Models
{
    using MongoDB.Bson;

    public class User
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}