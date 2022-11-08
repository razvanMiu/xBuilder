import get from 'lodash/get';
import isArray from 'lodash/isArray';
import join from 'lodash/join';
import set from 'lodash/set';

type Object = { [key: string]: any };

class Config {
  _data: Object & {
    settings: Object;
    blocks: Object;
    components: Object;
  };

  constructor() {
    this._data = {
      settings: {},
      blocks: {},
      components: {},
    };
  }

  set(registry: string, item: any) {
    this._data[registry] = item;
  }

  get(registry: string) {
    return this._data[registry];
  }

  get settings() {
    return this._data.settings;
  }

  set settings(settings) {
    this._data.settings = settings;
  }

  get blocks() {
    return this._data.blocks;
  }

  set blocks(blocks) {
    this._data.blocks = blocks;
  }

  get components() {
    return this._data.components;
  }

  set components(components) {
    this._data.components = components;
  }

  getComponent(name: string) {
    return this._data.components[name] || {};
  }

  registerComponent({ name, component }: { name: string; component: any }) {
    if (!component) {
      throw new Error('No component provided');
    } else {
      this._data.components[name] = { component };
    }
  }
}

let config: Config;

if (typeof window !== 'undefined') {
  set(window, '_registry', new Config());
  config = get(window, '_registry');
} else {
  config = new Config();
}

Object.freeze(config);

export default config;
