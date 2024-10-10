const prisma = require('../prisma/index.js');

// Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const { slug, title, body, authorId } = req.body;

    console.log('Create post request received:', { slug, title, authorId });

    const result = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: { connect: { id: authorId } },
      },
    });

    console.log('Post created successfully:', result);
    res.json(result);

  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update an existing post
exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    console.log(`Update post request for ID: ${id}`);
    const result = await prisma.post.update({
      where: { id },
      data: { title, body },
    });
    console.log('Post updated successfully:', result);
    res.json(result);

  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    res.status(404).json({ error: `Post with ID ${id} not found` });
  }
};

// Delete a post
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Delete post request for ID: ${id}`);
    const result = await prisma.post.delete({
      where: { id },
    });
    console.log('Post deleted successfully:', result);
    res.json(result);

  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    res.status(404).json({ error: `Post with ID ${id} not found` });
  }
};

// Get all posts
exports.getPosts = async (req, res, next) => {
  try {
    console.log('Get posts request received');
    const result = await prisma.post.findMany();
    console.log('Posts retrieved successfully');
    res.json(result);

  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'No posts were found' });
  }
};
