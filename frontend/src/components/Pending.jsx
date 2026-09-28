export default function Pending({ label, count = 1 }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <p className="pending" key={index}>
          {label}
        </p>
      ))}
    </>
  )
}
