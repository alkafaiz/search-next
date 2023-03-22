import React from 'react';

interface AutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
    ref: React.Ref<HTMLInputElement>;
}

function Autocomplete(props: AutocompleteProps) {
    return (
        <input
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            placeholder='e.g. "John"'
            className="block w-full rounded-md border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:text-xl md:leading-6"
            {...props}
        />
    );
}

// eslint-disable-next-line react/display-name
export default React.forwardRef<HTMLInputElement, AutocompleteProps>((props, ref) => <Autocomplete {...props} ref={ref} />);
