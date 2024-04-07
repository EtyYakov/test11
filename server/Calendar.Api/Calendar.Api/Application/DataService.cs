using Calendar.Api.Data;
using Calendar.Api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace Calendar.Api.Application
{
    public static class DataService
    {
        public static List<User> LoadUsers()
        {
            string usersAsJson = File.ReadAllText(@"./Data/users.json");
            return JsonConvert.DeserializeObject<List<User>>(usersAsJson) ?? new List<User>();            
        }

        public static void SaveUsers(List<User> users)
        {
            string usersAsJson = JsonConvert.SerializeObject(users, Formatting.Indented);
            File.WriteAllText(@"./Data/users.json", usersAsJson);
        }

        public static List<Event> LoadEvents()
        {
            string events = File.ReadAllText(@"./Data/events.json");
            return JsonConvert.DeserializeObject<List<Event>>(events) ?? new List<Event>();
        }

        public static void SaveEvents(List<Event> events)
        {
            string eventsAsJson = JsonConvert.SerializeObject(events, Formatting.Indented);
            File.WriteAllText(@"./Data/events.json", eventsAsJson);
        }
    }




//    using BookStoreApi.Models;
//using Microsoft.Extensions.Options;
//using MongoDB.Driver;

//namespace BookStoreApi.Services;

//    public class BooksService
//    {
//        private readonly IMongoCollection<User> _userCollection;

//        public BooksService(
//            IOptions<MongoDBSettings> MongoDBSettings)
//        {
//            var mongoClient = new MongoClient(
//                MongoDBSettings.Value.ConnectionString);

//            var mongoDatabase = mongoClient.GetDatabase(
//                MongoDBSettings.Value.DatabaseName);

//            _userCollection = mongoDatabase.GetCollection<User>(
//                MongoDBSettings.Value.users);
//        }

//        public async Task<List<Book>> GetAsync() =>
//            await _booksCollection.Find(_ => true).ToListAsync();

//        public async Task<Book?> GetAsync(string id) =>
//            await _booksCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

//        public async Task CreateAsync(Book newBook) =>
//            await _booksCollection.InsertOneAsync(newBook);

//        public async Task UpdateAsync(string id, Book updatedBook) =>
//            await _booksCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

//        public async Task RemoveAsync(string id) =>
//            await _booksCollection.DeleteOneAsync(x => x.Id == id);
//    }
}
