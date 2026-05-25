
using InventoryApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovementsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MovementsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/movements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movement>>> GetAll()
        {
            return await _context.Movements
                .OrderByDescending(m => m.Date)
                .ToListAsync();
        }

        // GET: api/movements/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Movement>> GetById(int id)
        {
            var movement = await _context.Movements.FindAsync(id);
            if (movement == null)
                return NotFound();

            return movement;
        }

        // POST: api/movements
        [HttpPost]
        public async Task<ActionResult<Movement>> Create(Movement movement)
        {
            var product = await _context.Products.FindAsync(movement.ProductId);
            if (product == null)
                return BadRequest("Product not found");

            // Aggiorna stock
            if (movement.Type == "IN")
                product.Stock += movement.Quantity;
            else if (movement.Type == "OUT")
                product.Stock -= movement.Quantity;

            _context.Movements.Add(movement);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = movement.Id }, movement);
        }

        // DELETE: api/movements/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var movement = await _context.Movements.FindAsync(id);
            if (movement == null)
                return NotFound();

            // Ripristina stock
            var product = await _context.Products.FindAsync(movement.ProductId);
            if (product != null)
            {
                if (movement.Type == "IN")
                    product.Stock -= movement.Quantity;
                else if (movement.Type == "OUT")
                    product.Stock += movement.Quantity;
            }

            _context.Movements.Remove(movement);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
