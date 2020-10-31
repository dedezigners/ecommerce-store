export default [
  {
    _name: 'CSidebarNav',
    _children: [
      { _name: 'CSidebarNavItem', name: 'Dashboard', to: '/admin/dashboard', icon: 'cil-speedometer' },
      { _name: 'CSidebarNavItem', name: 'Categories', to: '/admin/categories', icon: 'cil-apps' },
      { _name: 'CSidebarNavItem', name: 'Experiences', to: '/admin/experiences', icon: 'cil-vector' },
      { _name: 'CSidebarNavItem', name: 'Music Genres', to: '/admin/music-geners', icon: 'cil-music-note' },
      { _name: 'CSidebarNavItem', name: 'Skills', to: '/admin/skills', icon: 'cil-command' },
      { _name: 'CSidebarNavItem', name: 'Users', to: '/admin/users', icon: 'cil-group' },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Verification Requests',
        route: '/verification',
        icon: 'cil-cursor',
        items: [
          { name: 'Freelancer COC', to: '/verification/freelancer-coc' },
          { name: 'Artists Profile', to: '/verification/artist-profile' },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Blog',
        route: '/blog',
        icon: 'cil-cursor',
        items: [
          { name: 'Posts', to: '/blog/posts' },
          { name: 'Trash', to: '/blog/trash-posts' },
        ]
      },
      // { _name: 'CSidebarNavTitle', _children: ['Pages'] }
    ]
  }
]