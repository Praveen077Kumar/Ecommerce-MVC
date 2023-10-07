exports.getPosts = (req, res, next) => {
    res.status(200).json({
      posts: [
        { 
          _id:'1',
          title: 'First Post',
          content: 'This is the first post!',
          imageUrl:'../images/honey.jpg',
          creator:{
            name:'Maximillian'
          },
          createdAt: Date.now(),
        }
      ]
    });
  };

  exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    // Create post in db
    res.status(201).json({
      message: 'Post created successfully!',
      post: { id: new Date().toISOString(), 
        title: title, 
        content: content,
        creator:{ name: 'Praveen Kumar'},
        createdAt: new Date()
      }
    });
  };