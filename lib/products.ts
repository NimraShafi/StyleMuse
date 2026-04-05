import { supabase } from "./supabase";

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  priceNum: number;
  image: string; 
  images: string[]; 
  colors: {
    name: string;
    images: string[];
    price: string;
    priceNum: number;
  }[];
  tag: string;
  category: string;
  sizes: string[];
  description: string;
  details: string[];
  affiliate_url?: string;
}

/**
 * Helper function to parse JSON strings in product data.
 * It ensures 'colors' and 'images' fields are correctly parsed from string to objects/arrays.
 * @param product The raw product object from Supabase.
 * @returns The product object with parsed 'colors' and 'images'.
 */
function parseProductJsonFields(product: any): Product {
  let parsedColors;
  try {
    parsedColors = typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors;
  } catch (e) {
    console.error(`Error parsing colors for product ${product.id}:`, e);
    parsedColors = [];
  }

  let parsedImages;
  try {
    if (typeof product.images === 'string' && product.images.startsWith('[')) {
      parsedImages = JSON.parse(product.images);
    } else if (typeof product.images === 'string') {
      parsedImages = [product.images];
    } else if (Array.isArray(product.images)) {
      parsedImages = product.images;
    } else {
      parsedImages = [];
    }
  } catch (e) {
    console.error(`Error parsing images for product ${product.id}:`, e);
    parsedImages = [];
  }

  return {
    ...product,
    colors: parsedColors,
    images: parsedImages,
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data || []).map(parseProductJsonFields);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return undefined;
  }

  return data ? parseProductJsonFields(data) : undefined;
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }

  return (data || []).map(parseProductJsonFields);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%,category.ilike.%${query}%,tag.ilike.%${query}%`);

  if (error) {
    console.error("Error searching products:", error);
    return [];
  }

  return (data || []).map(parseProductJsonFields);
}

export async function getCategories() {
  const products = await getProducts();
  const categoryMap = new Map<
    string,
    { id: string; name: string; count: number; image: string }
  >();

  products.forEach((product) => {
    if (!categoryMap.has(product.category)) {
      const name =
        product.category.charAt(0).toUpperCase() + product.category.slice(1);
      const image = `/images/category-${product.category}.jpg`;
      categoryMap.set(product.category, {
        id: product.category,
        name,
        count: 0,
        image,
      });
    }
    categoryMap.get(product.category)!.count++;
  });

  return Array.from(categoryMap.values());
}