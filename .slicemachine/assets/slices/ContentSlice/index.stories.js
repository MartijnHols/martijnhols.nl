import MyComponent from '../../../../slices/ContentSlice';

export default {
  title: 'slices/ContentSlice'
}


export const _Default = () => <MyComponent slice={{"variation":"default","name":"Default","slice_type":"content_slice","items":[],"primary":{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=500&fit=crop"},"content":[{"type":"paragraph","text":"Lorem est consectetur magna id duis cillum duis eiusmod in laborum.","spans":[]},{"type":"paragraph","text":"Laboris aute irure ad duis tempor culpa sint nisi proident occaecat incididunt enim elit mollit. Exercitation magna duis aliquip. Sunt aliquip magna commodo in velit sit esse id amet esse duis duis dolore.","spans":[]},{"type":"paragraph","text":"Anim id occaecat adipisicing nulla eu id magna excepteur. Non ut ut deserunt ea esse mollit pariatur reprehenderit sint commodo qui dolore ea. Dolor deserunt do culpa.","spans":[]}]},"id":"_Default"}} />
_Default.storyName = 'Default'

export const _Inverted = () => <MyComponent slice={{"variation":"inverted","name":"Inverted","slice_type":"content_slice","items":[],"primary":{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=500&fit=crop"},"content":[{"type":"paragraph","text":"Ullamco officia ipsum ipsum ut est est velit consequat sint voluptate culpa consequat nostrud. Lorem laboris amet ea eiusmod sunt aliqua. Ea laborum Lorem irure irure cupidatat aliquip eu consequat culpa ipsum proident ad mollit.","spans":[]},{"type":"paragraph","text":"Pariatur cillum est do irure eu mollit velit aliquip. Consequat pariatur fugiat mollit culpa pariatur ipsum sint commodo anim veniam. Ipsum irure do proident.","spans":[]},{"type":"paragraph","text":"Elit excepteur nulla duis ea. Ut aliquip qui ullamco fugiat proident duis do quis adipisicing.","spans":[]}]},"id":"_Inverted"}} />
_Inverted.storyName = 'Inverted'
