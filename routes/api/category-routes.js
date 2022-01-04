const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'stock', 'price']
      }
    })
    return res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'stock', 'price']
      }
    })
    return res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categories = await Category.create({
      category_name: req.body.category_name
    })
    return res.json(categories)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!categories) {
      res.status(404).json({ message: 'No such category' })
    } else return res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categories) {
      res.status(404).json({ message: 'No such category' })
    } else return res.json(categories);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
