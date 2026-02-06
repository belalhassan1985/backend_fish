"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding...');
    const categoriesData = [
        { id: 1, parentId: null, nameAr: 'أسماك الزينة', nameEn: 'Ornamental Fish', slug: 'ornamental-fish', description: 'أسماك الزينة بمختلف الأنواع', imageUrl: 'https://picsum.photos/seed/cat-fish/1200/600', sortOrder: 1, isActive: true },
        { id: 2, parentId: null, nameAr: 'الأحواض ومستلزماتها', nameEn: 'Aquariums & Accessories', slug: 'aquariums-accessories', description: 'أحواض زجاجية وإكسسوارات', imageUrl: 'https://picsum.photos/seed/cat-aqua/1200/600', sortOrder: 2, isActive: true },
        { id: 3, parentId: null, nameAr: 'الفلاتر والهواء', nameEn: 'Filters & Air', slug: 'filters-air', description: 'فلاتر ومضخات وهواء', imageUrl: 'https://picsum.photos/seed/cat-filter/1200/600', sortOrder: 3, isActive: true },
        { id: 4, parentId: null, nameAr: 'التسخين والإضاءة', nameEn: 'Heating & Lighting', slug: 'heating-lighting', description: 'سخانات وإضاءات للأحواض', imageUrl: 'https://picsum.photos/seed/cat-light/1200/600', sortOrder: 4, isActive: true },
        { id: 5, parentId: null, nameAr: 'الأكل والتغذية', nameEn: 'Food', slug: 'food', description: 'أطعمة وأسمدة ومكملات', imageUrl: 'https://picsum.photos/seed/cat-food/1200/600', sortOrder: 5, isActive: true },
        { id: 6, parentId: null, nameAr: 'العلاج وقياسات الماء', nameEn: 'Treatment & Water Tests', slug: 'treatment-water-tests', description: 'أدوية وفحوصات ومزيلات كلور', imageUrl: 'https://picsum.photos/seed/cat-test/1200/600', sortOrder: 6, isActive: true },
        { id: 7, parentId: null, nameAr: 'الديكور والنباتات', nameEn: 'Decor & Plants', slug: 'decor-plants', description: 'ديكور ونباتات ومستلزمات شكلية', imageUrl: 'https://picsum.photos/seed/cat-decor/1200/600', sortOrder: 7, isActive: true },
        { id: 8, parentId: null, nameAr: 'التنظيف والصيانة', nameEn: 'Cleaning & Maintenance', slug: 'cleaning-maintenance', description: 'معدات تنظيف وصيانة', imageUrl: 'https://picsum.photos/seed/cat-clean/1200/600', sortOrder: 8, isActive: true },
        { id: 9, parentId: 1, nameAr: 'مياه عذبة', nameEn: 'Freshwater', slug: 'freshwater-fish', description: 'أسماك مياه عذبة مناسبة للأحواض المنزلية', imageUrl: 'https://picsum.photos/seed/cat-fresh/1200/600', sortOrder: 1, isActive: true },
        { id: 10, parentId: 1, nameAr: 'مياه مالحة', nameEn: 'Saltwater', slug: 'saltwater-fish', description: 'أسماك مياه مالحة (خبرة أعلى)', imageUrl: 'https://picsum.photos/seed/cat-salt/1200/600', sortOrder: 2, isActive: true },
        { id: 11, parentId: 1, nameAr: 'مناسبة للمبتدئين', nameEn: 'Beginner Friendly', slug: 'beginner-fish', description: 'اختيارات آمنة وسهلة العناية', imageUrl: 'https://picsum.photos/seed/cat-beginner/1200/600', sortOrder: 3, isActive: true },
    ];
    for (const cat of categoriesData) {
        await prisma.category.upsert({
            where: { id: cat.id },
            update: {},
            create: {
                id: cat.id,
                parentId: cat.parentId,
                nameAr: cat.nameAr,
                nameEn: cat.nameEn,
                slug: cat.slug,
                description: cat.description,
                imageUrl: cat.imageUrl,
                sortOrder: cat.sortOrder,
                isActive: cat.isActive,
            },
        });
    }
    const tagsData = [
        { id: 1, nameAr: 'مناسب للمبتدئين', slug: 'beginner' },
        { id: 2, nameAr: 'ماء عذب', slug: 'fresh' },
        { id: 3, nameAr: 'ماء مالح', slug: 'salt' },
        { id: 4, nameAr: 'هادئ', slug: 'peaceful' },
        { id: 5, nameAr: 'نباتات', slug: 'planted-tank' },
        { id: 6, nameAr: 'اقتصادي', slug: 'budget' },
        { id: 7, nameAr: 'جديد اليوم', slug: 'new-today' },
    ];
    for (const tag of tagsData) {
        await prisma.tag.upsert({
            where: { id: tag.id },
            update: { nameAr: tag.nameAr },
            create: tag,
        });
    }
    const productsData = [
        { id: 1, categoryId: 9, sku: 'FISH-GOLDFISH-01', nameAr: 'سمكة جولد فيش', nameEn: 'Goldfish', slug: 'goldfish', description: 'سمكة مناسبة للمبتدئين، تُفضّل حوض واسع وفلترة جيدة.', price: 5000, stockQty: 20, isInStock: true, isFeatured: true, productType: client_1.ProductType.FISH, waterType: client_1.WaterType.FRESH, difficulty: client_1.Difficulty.BEGINNER, sizeCmMin: 3.0, sizeCmMax: 15.0, tempCMin: 18.0, tempCMax: 24.0 },
        { id: 2, categoryId: 9, sku: 'FISH-GUPPY-01', nameAr: 'سمكة گـوبي', nameEn: 'Guppy', slug: 'guppy', description: 'سمكة صغيرة وملونة، ممتازة للأحواض المزروعة.', price: 2500, stockQty: 50, isInStock: true, isFeatured: true, productType: client_1.ProductType.FISH, waterType: client_1.WaterType.FRESH, difficulty: client_1.Difficulty.BEGINNER, sizeCmMin: 2.0, sizeCmMax: 6.0, tempCMin: 22.0, tempCMax: 27.0 },
        { id: 3, categoryId: 9, sku: 'FISH-BETTA-01', nameAr: 'سمكة بيتا (مقاتلة)', nameEn: 'Betta', slug: 'betta', description: 'يفضل وضعها لوحدها أو مع أسماك متوافقة. لا تحب التيار القوي.', price: 8000, compareAtPrice: 10000, stockQty: 10, isInStock: true, isFeatured: false, productType: client_1.ProductType.FISH, waterType: client_1.WaterType.FRESH, difficulty: client_1.Difficulty.BEGINNER, sizeCmMin: 4.0, sizeCmMax: 7.0, tempCMin: 24.0, tempCMax: 28.0 },
        { id: 4, categoryId: 11, sku: 'FISH-MOLLY-01', nameAr: 'سمكة مولّي', nameEn: 'Molly', slug: 'molly', description: 'سمكة قوية ومناسبة للمبتدئين، تتأقلم بسهولة.', price: 3500, stockQty: 25, isInStock: true, isFeatured: false, productType: client_1.ProductType.FISH, waterType: client_1.WaterType.FRESH, difficulty: client_1.Difficulty.BEGINNER, sizeCmMin: 3.0, sizeCmMax: 10.0, tempCMin: 24.0, tempCMax: 28.0 },
        { id: 5, categoryId: 2, sku: 'TANK-20L-01', nameAr: 'حوض زجاج 20 لتر', nameEn: 'Glass Tank 20L', slug: 'glass-tank-20l', description: 'حوض عملي للمبتدئين أو أحواض حجر صحي.', price: 30000, stockQty: 8, isInStock: true, isFeatured: true, productType: client_1.ProductType.EQUIPMENT },
        { id: 6, categoryId: 2, sku: 'TANK-STAND-01', nameAr: 'قاعدة حوض متوسطة', nameEn: 'Aquarium Stand', slug: 'aquarium-stand-medium', description: 'قاعدة قوية تتحمل وزن حوض متوسط.', price: 45000, stockQty: 6, isInStock: true, isFeatured: false, productType: client_1.ProductType.EQUIPMENT },
        { id: 7, categoryId: 3, sku: 'FILTER-HOB-01', nameAr: 'فلتر شلال HOB متوسط', nameEn: 'HOB Filter', slug: 'hob-filter-medium', description: 'فلتر شلال سهل التركيب وصيانة بسيطة.', price: 22000, compareAtPrice: 26000, stockQty: 12, isInStock: true, isFeatured: true, productType: client_1.ProductType.EQUIPMENT },
        { id: 8, categoryId: 3, sku: 'AIR-PUMP-01', nameAr: 'مضخة هواء صغيرة', nameEn: 'Air Pump Small', slug: 'air-pump-small', description: 'مضخة هواء هادئة مع استهلاك منخفض.', price: 12000, stockQty: 18, isInStock: true, isFeatured: false, productType: client_1.ProductType.EQUIPMENT },
        { id: 9, categoryId: 4, sku: 'HEATER-100W-01', nameAr: 'سخان 100 واط', nameEn: 'Heater 100W', slug: 'heater-100w', description: 'سخان مناسب للأحواض المتوسطة مع تحكم بالحرارة.', price: 18000, stockQty: 10, isInStock: true, isFeatured: false, productType: client_1.ProductType.EQUIPMENT },
        { id: 10, categoryId: 4, sku: 'LIGHT-LED-01', nameAr: 'إضاءة LED للحوض (متوسطة)', nameEn: 'LED Aquarium Light', slug: 'led-aquarium-light', description: 'إضاءة قوية للأحواض والنباتات (حسب الاستخدام).', price: 25000, compareAtPrice: 30000, stockQty: 9, isInStock: true, isFeatured: true, productType: client_1.ProductType.EQUIPMENT },
        { id: 11, categoryId: 5, sku: 'FOOD-FLAKES-01', nameAr: 'أكل رقائق للأسماك (Flakes)', nameEn: 'Fish Flakes', slug: 'fish-food-flakes', description: 'أكل يومي متوازن لمعظم أسماك المياه العذبة.', price: 8000, stockQty: 30, isInStock: true, isFeatured: false, productType: client_1.ProductType.FOOD },
        { id: 12, categoryId: 6, sku: 'WATER-DECHLOR-01', nameAr: 'مزيل كلور للماء', nameEn: 'Water Dechlorinator', slug: 'water-dechlorinator', description: 'يعالج الكلور والكلورامين ويحمي الأسماك عند تغيير الماء.', price: 9000, stockQty: 20, isInStock: true, isFeatured: false, productType: client_1.ProductType.MEDICINE },
    ];
    for (const p of productsData) {
        await prisma.product.upsert({
            where: { id: p.id },
            update: {},
            create: {
                id: p.id,
                categoryId: p.categoryId,
                sku: p.sku,
                nameAr: p.nameAr,
                nameEn: p.nameEn,
                slug: p.slug,
                description: p.description,
                price: p.price,
                compareAtPrice: p.compareAtPrice,
                stockQty: p.stockQty,
                isInStock: p.isInStock,
                isFeatured: p.isFeatured,
                productType: p.productType,
                waterType: p.waterType,
                difficulty: p.difficulty,
                sizeCmMin: p.sizeCmMin,
                sizeCmMax: p.sizeCmMax,
                tempCMin: p.tempCMin,
                tempCMax: p.tempCMax,
            },
        });
    }
    const mediaData = [
        { productId: 1, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/goldfish1/900/900', title: 'جولد فيش - صورة 1', isPrimary: true, displayOrder: 1 },
        { productId: 1, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/goldfish2/900/900', title: 'جولد فيش - صورة 2', isPrimary: false, displayOrder: 2 },
        { productId: 1, mediaType: client_1.MediaType.YOUTUBE, youtubeVideoId: 'VIDEOID1', title: 'فيديو جولد فيش', description: 'Shorts يوضح السمكة بالحوض', isPrimary: false, displayOrder: 3 },
        { productId: 2, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/guppy1/900/900', title: 'گوبي - صورة 1', isPrimary: true, displayOrder: 1 },
        { productId: 2, mediaType: client_1.MediaType.YOUTUBE, youtubeVideoId: 'VIDEOID2', title: 'فيديو گوبي', isPrimary: false, displayOrder: 2 },
        { productId: 3, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/betta1/900/900', title: 'بيتا - صورة 1', isPrimary: true, displayOrder: 1 },
        { productId: 3, mediaType: client_1.MediaType.YOUTUBE, youtubeVideoId: 'VIDEOID3', title: 'فيديو بيتا', description: 'لا Autoplay - عرض داخل المنتج', isPrimary: false, displayOrder: 2 },
        { productId: 4, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/molly1/900/900', title: 'مولّي - صورة 1', isPrimary: true, displayOrder: 1 },
        { productId: 5, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/tank1/900/900', title: 'حوض 20 لتر', isPrimary: true, displayOrder: 1 },
        { productId: 6, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/stand1/900/900', title: 'قاعدة حوض', isPrimary: true, displayOrder: 1 },
        { productId: 7, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/filter1/900/900', title: 'فلتر شلال', isPrimary: true, displayOrder: 1 },
        { productId: 7, mediaType: client_1.MediaType.YOUTUBE, youtubeVideoId: 'VIDEOID7', title: 'شرح فلتر شلال', description: 'فيديو تشغيل سريع', isPrimary: false, displayOrder: 2 },
        { productId: 8, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/air1/900/900', title: 'مضخة هواء', isPrimary: true, displayOrder: 1 },
        { productId: 9, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/heater1/900/900', title: 'سخان 100 واط', isPrimary: true, displayOrder: 1 },
        { productId: 10, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/led1/900/900', title: 'إضاءة LED', isPrimary: true, displayOrder: 1 },
        { productId: 11, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/food1/900/900', title: 'أكل رقائق', isPrimary: true, displayOrder: 1 },
        { productId: 12, mediaType: client_1.MediaType.IMAGE, url: 'https://picsum.photos/seed/dechlor1/900/900', title: 'مزيل كلور', isPrimary: true, displayOrder: 1 },
    ];
    for (const m of mediaData) {
        await prisma.productMedia.create({
            data: m
        });
    }
    const productTagsData = [
        { productId: 1, tagId: 1 }, { productId: 1, tagId: 2 }, { productId: 1, tagId: 7 },
        { productId: 2, tagId: 1 }, { productId: 2, tagId: 2 }, { productId: 2, tagId: 5 },
        { productId: 3, tagId: 1 }, { productId: 3, tagId: 2 },
        { productId: 4, tagId: 1 }, { productId: 4, tagId: 2 }, { productId: 4, tagId: 4 },
        { productId: 7, tagId: 6 },
        { productId: 8, tagId: 6 },
        { productId: 12, tagId: 7 },
    ];
    for (const pt of productTagsData) {
        await prisma.productTag.upsert({
            where: { productId_tagId: { productId: pt.productId, tagId: pt.tagId } },
            update: {},
            create: pt,
        });
    }
    await prisma.storeSettings.upsert({
        where: { settingKey: 'whatsapp_number' },
        update: { settingValue: '9647735125056' },
        create: { settingKey: 'whatsapp_number', settingValue: '9647735125056' },
    });
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map