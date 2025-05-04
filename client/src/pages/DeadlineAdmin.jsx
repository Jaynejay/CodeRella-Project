import { X } from 'lucide-react'
import PropTypes from 'prop-types'

/**
 * Deadline component displays a card with a header, a list of details, and an action button.
 *
 * @param {object} props
 * @param {string} props.headerText - The title text in the header.
 * @param {() => void} [props.onClose] - Optional close handler for the X button.
 * @param {{icon: React.ComponentType, text: string}[]} props.details - Array of detail rows.
 * @param {string} props.buttonText - Label for the action button.
 * @param {number|string} [props.width=480] - Container width (px or CSS string).
 * @param {number|string} [props.height=400] - Container height (px or CSS string).
 */
export default function Deadline({
  headerText,
  onClose,
  details,
  buttonText,
  width = 480,
  height = 400
}) {
  return (
    <div
      className="bg-gray-100 p-4"
      style={{ width: typeof width === 'number' ? `${width}px` : width, height: typeof height === 'number' ? `${height}px` : height }}
    >
      <div className="bg-white rounded-xl shadow-lg h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-900 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-medium">{headerText}</h2>
          {onClose && (
            <button onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <ul className="space-y-4">
            {details.map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2 text-gray-800">
                <item.icon size={20} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-4">
            <button className="bg-blue-50 text-gray-800 px-4 py-1 rounded-full shadow">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// PropTypes validation to satisfy ESLint
Deadline.propTypes = {
  headerText: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  details: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  buttonText: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

// no defaultProps needed because defaults are in function signature
