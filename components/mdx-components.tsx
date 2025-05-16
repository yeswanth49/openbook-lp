import Image from 'next/image'

const MDXComponents = {
  img: (props: any) => <Image {...props} alt={props.alt || ''} />,
}

export default MDXComponents 