
import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange, theme }) => {
  return (
    <Editor
      height="83vh"
      theme={theme} 
      language={language}
      value={value}
      onChange={onChange}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;