const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'stock', 'price', 'category_id']
      }
    })
    return res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'stock', 'price']
      }
    })
    return res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tags = await Tag.create({
      tag_name: req.body.tag_name
    })
    return res.json(tags)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tags = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!tags) {
      res.status(404).json({ message: 'No such category' })
    } else return res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const tags = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!tags) {
      res.status(404).json({ message: 'No such category' })
    } else return res.json(tags);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
