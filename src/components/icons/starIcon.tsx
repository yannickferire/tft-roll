interface IStarIcon {
  color: string;
  size?: number;
}

const StarIcon: React.FC<IStarIcon> = ({color, size = 3}) => {
  return (
    <svg className={`w-${size} fill-${color} inline-block align-middle`} id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 489.33">
      <path d="M262.23,44.39l54.94,111.32c2.64,5.34,7.73,9.05,13.63,9.9l122.85,17.85c14.85,2.16,20.78,20.41,10.03,30.88l-88.89,86.65c-4.27,4.16-6.21,10.15-5.21,16.02l20.98,122.35c2.54,14.79-12.99,26.07-26.27,19.08l-109.88-57.77c-5.27-2.77-11.57-2.77-16.85,0l-109.88,57.77c-13.28,6.98-28.8-4.3-26.27-19.08l20.98-122.35c1.01-5.87-.94-11.87-5.21-16.02L28.32,214.34c-10.75-10.47-4.82-28.72,10.03-30.88l122.85-17.85c5.9-.86,10.99-4.56,13.63-9.9l54.94-111.32c6.64-13.46,25.83-13.46,32.47,0Z"/>
    </svg>
  )
}

export default StarIcon;