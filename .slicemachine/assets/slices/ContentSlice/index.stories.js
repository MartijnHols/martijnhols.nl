import MyComponent from '../../../../slices/ContentSlice';

export default {
  title: 'slices/ContentSlice'
}


export const _Default = () => <MyComponent slice={{"variation":"default","name":"Default","slice_type":"content_slice","items":[],"primary":{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=500&fit=crop"},"content":[{"type":"paragraph","text":"Aute incididunt proident elit ex Lorem labore consequat.","spans":[]},{"type":"paragraph","text":"Velit veniam ex ut officia in Lorem commodo ipsum tempor consequat officia. Officia id voluptate elit nostrud incididunt id irure. Aliqua culpa minim magna elit elit occaecat.","spans":[]},{"type":"paragraph","text":"Velit aliqua aliquip commodo dolore mollit dolor est sit nostrud minim ex aliqua proident ipsum.","spans":[]}]},"id":"_Default"}} />
_Default.storyName = 'Default'

export const _Inverted = () => <MyComponent slice={{"variation":"inverted","name":"Inverted","slice_type":"content_slice","items":[],"primary":{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=500&fit=crop"},"content":[{"type":"paragraph","text":"Do irure Lorem ipsum in cillum. Aute ullamco eiusmod reprehenderit ut minim voluptate. Excepteur consequat culpa anim reprehenderit excepteur proident elit aliqua nostrud deserunt excepteur eiusmod.","spans":[]},{"type":"paragraph","text":"Velit in anim amet. Ea ipsum ad excepteur proident reprehenderit anim irure velit duis adipisicing esse nulla commodo id quis. Anim dolor laboris nisi ea id consectetur amet eu laborum ut in adipisicing.","spans":[]},{"type":"paragraph","text":"Elit tempor ad occaecat exercitation voluptate est eiusmod labore ea nulla.","spans":[]}]},"id":"_Inverted"}} />
_Inverted.storyName = 'Inverted'
