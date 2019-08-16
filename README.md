# Glutenblocks

[![Latest Stable Version](https://poser.pugx.org/eXolnet/glutenblocks/v/stable?format=flat-square)](https://packagist.org/packages/eXolnet/glutenblocks)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/eXolnet/glutenblocks/master.svg?style=flat-square)](https://travis-ci.org/eXolnet/glutenblocks)
[![Total Downloads](https://img.shields.io/packagist/dt/eXolnet/glutenblocks.svg?style=flat-square)](https://packagist.org/packages/eXolnet/glutenblocks)

Collection of Wordpress blocks for the Gutenberg editor.

## Installation
`composer require exolnet/glutenblocks`

## Usage

If you need to create a new Block, please use the `packages/src/example` as the skeleton of your new block. 

## Developement flow

To be able to see the components, you need to install the plugin in a Wordpress site. If you have Docker installed, 
you can create a new Wordpress site quickly with this command:
``` bash
docker-compose -f docker-compose.yml -f docker-compose-localdev.yml up
```
Your Wordpress site will be available on `localhost:8888`. You will have to finish the Wordpress installation in the browser.

If it is the first time you start the Docker containers, you will need to enable Glutenblocks plugin from the WP admin panel.

When you are done, you can stop the `docker-compose` process to stop the server from working.

If you want to remove the containers from your development machine, you can run this command:
``` bash
docker-compose down
```

## Testing

### Lint
To run linter tests (project guidelines), please use: 
``` bash
yarn lint
composer lint
```
### Unit Tests
To run the phpUnit tests, please use:

``` bash
composer test
```

### Component Tests
To run your components tests, please use:
``` bash
yarn test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) and [CODE OF CONDUCT](CODE_OF_CONDUCT.md) for details.

## Security

If you discover any security related issues, please email security@exolnet.com instead of using the issue tracker.

## Credits

- [Alexandre D'Eschambeault](https://github.com/xel1045)
- [Martin Blanchette](https://github.com/martinblanchette)
- [Maxime Mongeau](https://github.com/Maxador)
- [Simon Gaudreau](https://github.com/Gandhi11)
- [All Contributors](../../contributors)

## License

This code is licensed under the [MIT license](http://choosealicense.com/licenses/mit/). 
Please see the [license file](LICENSE) for more information.
