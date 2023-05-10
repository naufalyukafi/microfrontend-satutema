import { Container } from '@chakra-ui/react';
import {
  Feature1,
  Gallery1,
  Hero1,
  Hero2,
  Menu1,
  Navbar1,
  Navbar2,
  Navbar3,
  Testimoni1,
  Footerl,
  Footer2,
  Footer3,
  useRemoteWebsite,
  useRemoteTheme,
} from '@satutema/umkm-theme-libs';

const Website = () => {
  const { data } = useRemoteWebsite();
  const { data: theme } = useRemoteTheme();

  const findTheme =
    data && theme && theme.filter((el) => el.id === data.theme_id)[0];
  const content = data && JSON.parse(data.content);

  const renderNavEditor = (id: string | undefined) => {
    if (data) {
      switch (id) {
        case 'navbar1':
          return <Navbar1 logo={data?.website_name} />;
        case 'navbar2':
          return <Navbar2 logo={data?.website_name} />;
        case 'navbar3':
          return <Navbar3 logo={data?.website_name} />;
        default:
          return null;
      }
    }
  };

  const renderHeroEditor = (id: string | undefined) => {
    if (content) {
      switch (id) {
        case 'hero1':
          return (
            <Hero1
              titleHero={content.options.titleHero}
              descriptionHero={content.options.descriptionHero}
              imageHero={content.options.imageHero}
            />
          );
        case 'hero2':
          return (
            <Hero2
              titleHero={content.options.titleHero}
              descriptionHero={content.options.descriptionHero}
            />
          );
        default:
          return null;
      }
    }
  };

  const renderFeatureEditor = (id: string | undefined) => {
    if (content) {
      switch (id) {
        case 'feature1':
          return (
            <Feature1
              title={content.feature.title}
              description={content.feature.description}
              imageFeature={content.feature.imageFeature}
            />
          );
        default:
          return null;
      }
    }
  };

  const renderMenuEditor = (id: string | undefined) => {
    if (content) {
      switch (id) {
        case 'menu1':
          return <Menu1 data={content.product} />;
        default:
          return null;
      }
    }
  };

  const renderTestimoniEditor = (id: string | undefined) => {
    if (content) {
      switch (id) {
        case 'testimoni1':
          return <Testimoni1 data={content.testimony} />;
        default:
          return null;
      }
    }
  };

  const renderGalleryEditor = (id: string | undefined) => {
    if (content) {
      switch (id) {
        case 'gallery1':
          return <Gallery1 data={content.gallery} />;
        default:
          return null;
      }
    }
  };

  const renderFooterEditor = (id: string | undefined) => {
    if (content) {
      switch (id) {
        case 'footer1':
          return (
            <Footerl
              instagram={content.options.instagram}
              twitter={content.options.twitter}
              youtube={content.options.youtube}
            />
          );
        case 'footer2':
          return (
            <Footer2
              instagram={content.options.instagram}
              twitter={content.options.twitter}
              youtube={content.options.youtube}
            />
          );
        case 'footer3':
          return (
            <Footer3
              instagram={content.options.instagram}
              twitter={content.options.twitter}
              youtube={content.options.youtube}
            />
          );
        default:
          return null;
      }
    }
  };

  const findThemeData = (query: string) =>
    findTheme &&
    findTheme.theme_order.split(',').filter((el) => el.includes(query))[0];

  return (
    <>
      {findTheme && findThemeData && (
        <>
          {renderNavEditor(findThemeData('nav'))}
          {renderHeroEditor(findThemeData('hero'))}
          <Container maxW="container.xl">
            {renderFeatureEditor(findThemeData('feature'))}
            {renderMenuEditor(findThemeData('menu'))}
            {renderTestimoniEditor(findThemeData('testimoni'))}
            {renderGalleryEditor(findThemeData('gallery'))}
          </Container>
          {renderFooterEditor(findThemeData('footer'))}
        </>
      )}
    </>
  );
};

export default Website;
