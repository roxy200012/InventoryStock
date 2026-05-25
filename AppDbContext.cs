using Microsoft.EntityFrameworkCore;
using InventoryApi.Models;

namespace InventoryApi
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Movement> Movements => Set<Movement>();
        public DbSet<StockHistory> StockHistory => Set<StockHistory>();

    }
}
