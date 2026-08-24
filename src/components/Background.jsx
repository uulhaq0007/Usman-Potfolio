// Fixed animated gradient blob field behind everything.
export default function Background() {
  return (
    <div className="bg-field" aria-hidden="true">
      <span className="blob a" />
      <span className="blob b" />
      <span className="blob c" />
    </div>
  )
}
