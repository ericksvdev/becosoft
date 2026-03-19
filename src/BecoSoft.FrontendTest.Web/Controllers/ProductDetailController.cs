using BecoSoft.FrontendTest.Web.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BecoSoft.FrontendTest.Web.Controllers;

public class ProductDetailController : Controller
{
    public ActionResult Detail()
    {
        var model = new ProductDetailViewModel
        {
            Title = "Innovative School Backpack",
            SKU = "BAG-2025",
            Description = "Perfect for school or travel with durable design.",
            Brand = "Eastpak",
            Price = 79.99m,
            DiscountedPrice = 59.99m,
            InStock = true,
            ImageUrls = new List<string>
            {
                "https://bagageonline.xcdn.nl/products/0055292_ek0a5bik26w1_1.jpeg",
                "https://bagageonline.xcdn.nl/products/0055293_ek0a5bik26w1_2.jpeg"
            },
            SpecificationsHtml = "<ul><li>Material: Recycled Polyester</li><li>Volume: 22L</li></ul>",
            Reviews = new List<ReviewViewModel>
            {
                new ReviewViewModel { Author = "Emma", Rating = 5, Comment = "Great quality and size!" },
                new ReviewViewModel { Author = "Lucas", Rating = 4, Comment = "Nice color and comfortable." }
            },
            RelatedProducts = new List<RelatedProductViewModel>
            {
                new RelatedProductViewModel {
                    Title = "Innovative School Backpack 2",
                    ImageUrl = "https://bagageonline.xcdn.nl/products/0098123_ek0a5bik5s81_1.jpeg",
                    Price = 14.99m
                },
                new RelatedProductViewModel {
                    Title = "Innovative School Backpack 3",
                    ImageUrl = "https://bagageonline.xcdn.nl/products/0094482_ek0a5bik7s61_1.jpeg",
                    Price = 9.99m,
                    DiscountedPrice = 7.99m
                },
                new RelatedProductViewModel {
                    Title = "Innovative School Backpack 4",
                    ImageUrl = "https://bagageonline.xcdn.nl/products/0098123_ek0a5bik5s81_1.jpeg",
                    Price = 14.99m
                },
                new RelatedProductViewModel {
                    Title = "Innovative School Backpack 5",
                    ImageUrl = "https://bagageonline.xcdn.nl/products/0094482_ek0a5bik7s61_1.jpeg",
                    Price = 9.99m,
                    DiscountedPrice = 7.99m
                }
            }
        };

        ViewData["Breadcrumbs"] = new (string Label, string Url)[]
        {
            ("Backpacks", "/"),
            (model.Title, "/")
        };

        return View(model);
    }
}
