interface ICopyIcon {
  color: string;
  size?: number;
}

const CopyIcon: React.FC<ICopyIcon> = ({color, size = 3}) => {
  return (
    <svg className={`w-${size} fill-${color} inline-block`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 489.33">
      <path d="M411.99,0H183.64c-44.19,0-80.01,35.82-80.01,80.01v90.21h-23.58C35.83,170.23,0,206.06,0,250.26v159.03c0,44.2,35.83,80.03,80.03,80.03h228.31c44.2,0,80.03-35.83,80.03-80.03v-91.02h23.61c44.19,0,80.01-35.82,80.01-80.01V80.01C492,35.82,456.18,0,411.99,0Zm-97.82,393.13c0,16.94-13.73,30.67-30.67,30.67H104.41c-16.68,0-30.2-13.52-30.2-30.2v-127.67c0-16.41,13.1-29.75,29.4-30.16v2.48c0,44.19,35.82,80.01,80.01,80.01h130.53v74.86Z"/>
    </svg>
  )
}

export default CopyIcon;