import axios from "axios";
import prisma from "../../prisma/client";

export const getProductList = async () => {
  // Fetch products from database
  let products = await prisma.product.findMany();

  if (products.length === 0) {
    // Fetch from external API only if DB is empty
    const { data } = await axios.get("https://dummyjson.com/products");
    const productsToCreate = data.products.map((p: any) => ({
      id: p.id.toString(), // Prisma id is String
      title: p.title,
      description: p.description,
      price: p.price,
      thumbnail: p.thumbnail,
      createdAt: new Date(),
    }));

    await prisma.product.createMany({
      data: productsToCreate,
      skipDuplicates: true,
    });

    // Assign inserted products to variable
    products = await prisma.product.findMany();
  }

  return products;
};
