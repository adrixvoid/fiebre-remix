import { useState } from 'react'

export const useToggle = (defaultVisibility = false): [Boolean, () => void] => {
    const [isVisible, setIsVisible] = useState<Boolean>(defaultVisibility)

    const handleToggleInput = () => {
        setIsVisible(!isVisible)
    }

    return [isVisible, handleToggleInput]
}

export default useToggle
