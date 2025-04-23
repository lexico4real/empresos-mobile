import icons from '@/constants/icons'; // Assuming icons are defined here
import React, { useState } from 'react';
import { Image, StyleProp, TextInput, TextInputProps, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface SearchInputProps extends TextInputProps {
  initialQuery?: string;
  onSearch?: (query: string) => void; // Optional: Callback when search button is pressed
  containerStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  initialQuery = '',
  onSearch,
  placeholder = 'Search...',
  containerStyles,
  inputStyles,
  value,
  onChangeText,
  ...rest
}) => {
  // Internal state if value/onChangeText are not provided
  const [internalQuery, setInternalQuery] = useState(initialQuery);

  const query = value !== undefined ? value : internalQuery;
  const handleTextChange = onChangeText !== undefined ? onChangeText : setInternalQuery;

  const handleSearchPress = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <View
      style={containerStyles}
      className="flex-row items-center space-x-4 w-full h-14 px-4 bg-gray-100 rounded-2xl border border-gray-200 focus:border-secondary mx-3"
    >
      <TextInput
        className="text-base text-black flex-1 font-pregular"
        style={inputStyles}
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleTextChange}
        {...rest} // Pass other TextInput props
      />

      <TouchableOpacity onPress={handleSearchPress} disabled={!onSearch}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
