using System.Web.Mvc;
using System.Threading.Tasks;
using M101N.WebApp.Models;
using MongoDB.Driver;

namespace M101N.WebApp.Controllers
{
    public class HomeController : Controller
    {
        //GET: Home
        public async Task<ActionResult> Index()
        {
            var client = new MongoClient();
            var db = client.GetDatabase("test");
            var col = db.GetCollection<Person>("people");

            var person = await col.Find(x => x.Name.StartsWith("Jane")).FirstOrDefaultAsync();

            return View(person);
        }
    }
}