namespace BecoSoft.FrontendTest.Web.Models.ViewModels
{
    public class ProductDetailViewModel
    {
        public string Title { get; set; } = null!;
        public string SKU { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Brand { get; set; } = null!;
        public decimal Price { get; set; }
        public decimal? DiscountedPrice { get; set; }
        public bool InStock { get; set; }
        public List<string> ImageUrls { get; set; } = null!;
        public string SpecificationsHtml { get; set; } = null!;
        public List<ReviewViewModel> Reviews { get; set; } = null!;
        public List<RelatedProductViewModel> RelatedProducts { get; set; } = null!;
    }

    public class ReviewViewModel
    {
        public string Author { get; set; } = null!;
        public int Rating { get; set; }
        public string Comment { get; set; } = null!;
    }

    public class RelatedProductViewModel
    {
        public string Title { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
        public decimal Price { get; set; }
        public decimal? DiscountedPrice { get; set; }
    }
}
