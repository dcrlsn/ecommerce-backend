const router = require('express').Router();
const e = require('express');
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Tag,
          attributes: ['tag_name']
        }
      ]
    })
    return res.json(products);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const products = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Category,
          attributes: ['category_name']
        },
        {
          model: Tag,
          attributes: ['tag_name']
        }
      ]
    })
    return res.json(products);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds.length) {
      await product.setTags(req.body.tagIds);
      await product.save();
    }
    console.log(product.get({ plain: true }));
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [Tag],
      returning: true
    });
    await product.update(req.body);
    await product.setTags(req.body.tagIds);
    await product.save();
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const products = await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!products) {
      res.status(404).json({ message: 'No such product' })
    } else return res.json(products);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
