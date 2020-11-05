export default [
  {
    _name: 'CSidebarNav',
    _children: [
      { _name: 'CSidebarNavItem', name: 'Dashboard', to: '/admin/dashboard', icon: 'cil-speedometer' },
      { _name: 'CSidebarNavItem', name: 'Media', to: '/admin/media', icon: 'cil-camera' },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Products',
        icon: 'cil-3d',
        items: [
          { name: 'Products', to: '/admin/products' },
          { name: 'Categories', to: '/admin/categories' },
          { name: 'Attributes', to: '/admin/attributes' },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Blog',
        icon: 'cil-newspaper',
        items: [
          { name: 'Posts', to: '/admin/blog' },
          { name: 'Categories', to: '/admin/blog/categories' },
          { name: 'Tags', to: '/admin/blog/tags' },
        ]
      },
      
      { _name: 'CSidebarNavItem', name: 'Orders', to: '/admin/orders', icon: 'cil-cart' },
      { _name: 'CSidebarNavTitle', _children: ['Template Settings'] },
      { _name: 'CSidebarNavItem', name: 'Experiences', to: '/admin/experiences', icon: 'cil-vector' },
      { _name: 'CSidebarNavItem', name: 'Music Genres', to: '/admin/music-geners', icon: 'cil-music-note' },
      { _name: 'CSidebarNavItem', name: 'Skills', to: '/admin/skills', icon: 'cil-command' },
      { _name: 'CSidebarNavItem', name: 'Users', to: '/admin/users', icon: 'cil-group' },
      
      { _name: 'CSidebarNavTitle', _children: ['Default Preview'] },
      {
        _name: 'CSidebarNavItem', name: 'Live Preview', href: 'http://ecommerce.live/', icon: { name: 'cil-layers', class: 'text-white' },
        _class: 'bg-info text-white',
        target: '_blank'
      }
    ]
  }
]