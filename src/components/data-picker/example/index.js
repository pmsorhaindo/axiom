import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ExampleConfig } from 'style-guide';
import {
  DataPicker,
  DataPickerBody,
  DataPickerHeader,
  DropdownMenu,
  DropdownMenuItem,
  Heading,
  longNumber,
} from 'bw-axiom';
import { getData } from './data';
import { translate as t } from '../../../utils/locales';

class DataPickerExample extends Component {
  static contextTypes = {
    axiomLanguage: PropTypes.oneOf(['en', 'de', 'es', 'fr']),
  };

  static propTypes = {
    components: PropTypes.shape({
      DataPicker: PropTypes.object.isRequired,
      DataPickerBody: PropTypes.object.isRequired,
      DataPickerHeader: PropTypes.object.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedColor: undefined,
      selectedId: undefined,
    };
  }

  render() {
    const { components } = this.props;
    const { axiomLanguage } = this.context;
    const { selectedColor, selectedId } = this.state;
    const selected = getData().filter(({ id }) => id === selectedId)[0];

    const propTypes = {
      DataPicker: components.DataPicker,
      DataPickerBody: components.DataPickerBody,
      DataPickerHeader: components.DataPickerHeader,
    };

    const initialProps = {
      DataPicker: {
        color: selectedColor || (selected && selected.color),
        disabledColors: [ selectedColor ],
        onClear: () => this.setState({ selectedColor: undefined, selectedId: undefined }),
        onColorPickerOpen: () => {},
        onSelectColor: (color) => this.setState({ selectedColor: color }),
        placeholder: t(axiomLanguage, 'please-select-a-value'),
        value: selected && selected.name,
      },
    };

    return (
      <ExampleConfig
          initialProps={ initialProps }
          propTypes={ propTypes }>
        <DataPicker { ...initialProps.DataPicker }>
          <DataPickerHeader>
            <DropdownMenu snippetReplace>
              { getData().map(({ id, name }) => (
                <DropdownMenuItem
                    key={ id }
                    onClick={ () => this.setState({ selectedId: id }) }>
                  { name }
                </DropdownMenuItem>
              ) ) }
            </DropdownMenu>
          </DataPickerHeader>

          { selected && (
            <DataPickerBody snippetSkip>
              <Heading textSize="headline">{ longNumber(selected.authors) }</Heading>
            </DataPickerBody>
          ) }
        </DataPicker>
      </ExampleConfig>
    );
  }
}

module.exports = [
  DataPickerExample,
];
