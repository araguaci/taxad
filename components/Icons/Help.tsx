import Image from 'next/image'
 
export default function Help() {
  return (
    <Image
      src="/help.svg"
      width={350}
      height={300}
      alt="help" 
    />
  )
}