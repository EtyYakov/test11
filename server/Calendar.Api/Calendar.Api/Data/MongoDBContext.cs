using Calendar.Api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Calendar.Api.Data
{
    public class MongoDBContext
    {
        private readonly IMongoDatabase _database = null;

        public MongoDBContext(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<User> Users
        {
            get
            {
                return _database.GetCollection<User>("Users");
            }
        }

        public IMongoCollection<Event> Events
        {
            get
            {
                return _database.GetCollection<Event>("Events");
            }
        }
    }

    public class MongoDBSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}

