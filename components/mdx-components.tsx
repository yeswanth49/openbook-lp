import Image, { ImageProps } from 'next/image'

const MDXComponents = {
  img: (props: ImageProps) => {
    const { width = 600, height = 400, alt = '', ...rest } = props;
    return <Image {...rest} width={width} height={height} alt={alt} />;
  },
}

export default MDXComponents 