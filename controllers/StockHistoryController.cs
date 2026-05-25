
using InventoryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockHistoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StockHistoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/stockhistory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockHistory>>> GetAll()
        {
            return await _context.StockHistory
                .OrderBy(h => h.Date)
                .ToListAsync();
        }

        // POST: api/stockhistory
        [HttpPost]
        public async Task<ActionResult<StockHistory>> Create(StockHistory history)
        {
            _context.StockHistory.Add(history);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), history);
        }

        // DELETE: api/stockhistory/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entry = await _context.StockHistory.FindAsync(id);
            if (entry == null)
                return NotFound();

            _context.StockHistory.Remove(entry);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
