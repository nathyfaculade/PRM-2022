import { Router } from "express";
import BrandController from "./controller/BrandController";
import CategoryController from "./controller/CategoryController";
import ProductController from "./controller/ProductController";

//instancio o router do express
const router = Router();

//rotas das brand -end Point 1
router.route('/brands')
    .get(BrandController.index)
    .post(BrandController.create);

router.route('/brands/:id')
    .get(BrandController.show)
    .put(BrandController.update)
    .delete(BrandController.remove);


//rotas das category -end Point 1
router.route('/categories')
    .get(CategoryController.index)
    .post(CategoryController.create);

router.route('/brands/:id')
    .get(CategoryController.show)
    .put(CategoryController.update)
    .delete(CategoryController.remove);


//rotas das product -end Point 1
router.route('/products')
    .get(ProductController.index)
    .post(ProductController.create);

router.route('/products/:id')
    .get(ProductController.show)
    .put(ProductController.update)
    .delete(ProductController.remove);


export default router;