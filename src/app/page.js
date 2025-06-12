'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import md5 from 'md5';
import './Styles/global.css';
import logo from './Images/logo.png';

export default function Home() {
  const [isSpiralLoading, setIsSpiralLoading] = useState(true);
  const [isApiLoading, setIsApiLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterImages, setCharacterImages] = useState([]);
  const lastCardRef = useRef(null);

  // Character descriptions for MCU characters
  const characterDescriptions = {
    'Iron Man': 'Genius inventor in a high-tech suit.',
    'Spider-Man (Peter Parker)': 'Web-slinging hero of New York.',
    'Captain America': 'Super-soldier with an unbreakable shield.',
    'Thor': 'God of Thunder wielding Mjolnir.',
    'Hulk': 'Gamma-powered green giant.',
    'Black Widow': 'Master spy and deadly assassin.',
    'Doctor Strange': 'Sorcerer Supreme of the Mystic Arts.',
    'Black Panther': 'King of Wakanda with vibranium power.',
    'Captain Marvel': 'Cosmic-powered Kree warrior.',
    'Hawkeye': 'Expert archer with pinpoint accuracy.',
    'Scarlet Witch': 'Chaos magic wielder with reality-altering powers.',
    'Vision': 'Synthezoid with the Mind Stone.',
    'Ant-Man': 'Size-shifting thief turned hero.',
    'Wasp': 'Winged partner with shrinking tech.',
    'Falcon': 'High-flying hero with Redwing drone.',
    'Winter Soldier': 'Super-soldier with a bionic arm.',
    'Star-Lord': 'Leader of the Guardians, half-human outlaw.',
    'Gamora': 'Deadliest woman in the galaxy.',
    'Drax': 'Literal-minded destroyer seeking revenge.',
    'Rocket Raccoon': 'Genetically enhanced raccoon with a big gun.',
    'Groot': 'Tree-like being who says "I am Groot."',
    'Nebula': 'Cybernetic daughter of Thanos.',
    'Mantis': 'Empath with antenna powers.',
    'Nick Fury': 'S.H.I.E.L.D. director assembling the Avengers.',
    'Loki': 'Trickster god of mischief.',
    'Wong': 'Loyal sorcerer and Strange’s ally.',
    'Shuri': 'Wakandan princess and tech genius.',
    'Okoye': 'Leader of the Dora Milaje.',
    'Valkyrie': 'Asgardian warrior leading the charge.',
    'Korg': 'Rocky Kronan with a soft heart.',
  };

  // MCU movie details for each character
  const characterMovies = {
    'Iron Man': [
      { title: 'Iron Man', year: 2008, role: 'Lead' },
      { title: 'The Avengers', year: 2012, role: 'Team Member' },
      { title: 'Avengers: Endgame', year: 2019, role: 'Key Role' },
    ],
    'Spider-Man (Peter Parker)': [
      { title: 'Spider-Man: Homecoming', year: 2017, role: 'Lead' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Spider-Man: No Way Home', year: 2021, role: 'Lead' },
    ],
    'Captain America': [
      { title: 'Captain America: The First Avenger', year: 2011, role: 'Lead' },
      { title: 'The Avengers', year: 2012, role: 'Team Member' },
      { title: 'Captain America: Civil War', year: 2016, role: 'Lead' },
    ],
    'Thor': [
      { title: 'Thor', year: 2011, role: 'Lead' },
      { title: 'The Avengers', year: 2012, role: 'Team Member' },
      { title: 'Thor: Ragnarok', year: 2017, role: 'Lead' },
    ],
    'Hulk': [
      { title: 'The Incredible Hulk', year: 2008, role: 'Lead' },
      { title: 'The Avengers', year: 2012, role: 'Team Member' },
      { title: 'Thor: Ragnarok', year: 2017, role: 'Supporting' },
    ],
    'Black Widow': [
      { title: 'Iron Man 2', year: 2010, role: 'Supporting' },
      { title: 'The Avengers', year: 2012, role: 'Team Member' },
      { title: 'Black Widow', year: 2021, role: 'Lead' },
    ],
    'Doctor Strange': [
      { title: 'Doctor Strange', year: 2016, role: 'Lead' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Doctor Strange in the Multiverse of Madness', year: 2022, role: 'Lead' },
    ],
    'Black Panther': [
      { title: 'Black Panther', year: 2018, role: 'Lead' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Black Panther: Wakanda Forever', year: 2022, role: 'Supporting' },
    ],
    'Captain Marvel': [
      { title: 'Captain Marvel', year: 2019, role: 'Lead' },
      { title: 'Avengers: Endgame', year: 2019, role: 'Supporting' },
      { title: 'The Marvels', year: 2023, role: 'Lead' },
    ],
    'Hawkeye': [
      { title: 'Thor', year: 2011, role: 'Cameo' },
      { title: 'The Avengers', year: 2012, role: 'Team Member' },
      { title: 'Hawkeye (Series)', year: 2021, role: 'Lead' },
    ],
    'Scarlet Witch': [
      { title: 'Avengers: Age of Ultron', year: 2015, role: 'Supporting' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'WandaVision (Series)', year: 2021, role: 'Lead' },
    ],
    'Vision': [
      { title: 'Avengers: Age of Ultron', year: 2015, role: 'Supporting' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'WandaVision (Series)', year: 2021, role: 'Supporting' },
    ],
    'Ant-Man': [
      { title: 'Ant-Man', year: 2015, role: 'Lead' },
      { title: 'Avengers: Endgame', year: 2019, role: 'Supporting' },
      { title: 'Ant-Man and the Wasp: Quantumania', year: 2023, role: 'Lead' },
    ],
    'Wasp': [
      { title: 'Ant-Man', year: 2015, role: 'Cameo' },
      { title: 'Ant-Man and the Wasp', year: 2018, role: 'Lead' },
      { title: 'Avengers: Endgame', year: 2019, role: 'Supporting' },
    ],
    'Falcon': [
      { title: 'Captain America: The Winter Soldier', year: 2014, role: 'Supporting' },
      { title: 'Avengers: Age of Ultron', year: 2015, role: 'Cameo' },
      { title: 'The Falcon and the Winter Soldier (Series)', year: 2021, role: 'Lead' },
    ],
    'Winter Soldier': [
      { title: 'Captain America: The Winter Soldier', year: 2014, role: 'Antagonist' },
      { title: 'Captain America: Civil War', year: 2016, role: 'Supporting' },
      { title: 'The Falcon and the Winter Soldier (Series)', year: 2021, role: 'Lead' },
    ],
    'Star-Lord': [
      { title: 'Guardians of the Galaxy', year: 2014, role: 'Lead' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, role: 'Lead' },
    ],
    'Gamora': [
      { title: 'Guardians of the Galaxy', year: 2014, role: 'Supporting' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, role: 'Supporting' },
    ],
    'Drax': [
      { title: 'Guardians of the Galaxy', year: 2014, role: 'Supporting' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, role: 'Supporting' },
    ],
    'Rocket Raccoon': [
      { title: 'Guardians of the Galaxy', year: 2014, role: 'Supporting' },
      { title: 'Avengers: Endgame', year: 2019, role: 'Supporting' },
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, role: 'Lead' },
    ],
    'Groot': [
      { title: 'Guardians of the Galaxy', year: 2014, role: 'Supporting' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, role: 'Supporting' },
    ],
    'Nebula': [
      { title: 'Guardians of the Galaxy', year: 2014, role: 'Antagonist' },
      { title: 'Avengers: Endgame', year: 2019, role: 'Supporting' },
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, role: 'Supporting' },
    ],
    'Mantis': [
      { title: 'Guardians of the Galaxy Vol. 2', year: 2017, role: 'Supporting' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Guardians of the Galaxy Vol. 3', year: 2023, role: 'Supporting' },
    ],
    'Nick Fury': [
      { title: 'Iron Man', year: 2008, role: 'Cameo' },
      { title: 'The Avengers', year: 2012, role: 'Supporting' },
      { title: 'Captain Marvel', year: 2019, role: 'Supporting' },
    ],
    'Loki': [
      { title: 'Thor', year: 2011, role: 'Antagonist' },
      { title: 'The Avengers', year: 2012, role: 'Antagonist' },
      { title: 'Loki (Series)', year: 2021, role: 'Lead' },
    ],
    'Wong': [
      { title: 'Doctor Strange', year: 2016, role: 'Supporting' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, role: 'Supporting' },
    ],
    'Shuri': [
      { title: 'Black Panther', year: 2018, role: 'Supporting' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Black Panther: Wakanda Forever', year: 2022, role: 'Lead' },
    ],
    'Okoye': [
      { title: 'Black Panther', year: 2018, role: 'Supporting' },
      { title: 'Avengers: Infinity War', year: 2018, role: 'Supporting' },
      { title: 'Black Panther: Wakanda Forever', year: 2022, role: 'Supporting' },
    ],
    'Valkyrie': [
      { title: 'Thor: Ragnarok', year: 2017, role: 'Supporting' },
      { title: 'Avengers: Endgame', year: 2019, role: 'Supporting' },
      { title: 'Thor: Love and Thunder', year: 2022, role: 'Supporting' },
    ],
    'Korg': [
      { title: 'Thor: Ragnarok', year: 2017, role: 'Supporting' },
      { title: 'Avengers: Endgame', year: 2019, role: 'Cameo' },
      { title: 'Thor: Love and Thunder', year: 2022, role: 'Supporting' },
    ],
  };

  // Fetch MCU movie characters
  useEffect(() => {
    const spiralTimer = setTimeout(() => {
      setIsSpiralLoading(false);
    }, 3000);

    const fetchMarvelCharacters = async () => {
      try {
        const ts = new Date().getTime().toString();
        const publicKey = '718d54c4c2e49d1f6dbc080a9c0d39d9';
        const privateKey = 'f2e198b40ff123cbf0a408f2fa95d971e7433be5';
        const hash = md5(ts + privateKey + publicKey);

        const mcuCharacters = [
          'Iron Man',
          'Spider-Man (Peter Parker)',
          'Captain America',
          'Thor',
          'Hulk',
          'Black Widow',
          'Doctor Strange',
          'Black Panther',
          'Captain Marvel',
          'Hawkeye',
          'Scarlet Witch',
          'Vision',
          'Ant-Man',
          'Wasp',
          'Falcon',
          'Winter Soldier',
          'Star-Lord',
          'Gamora',
          'Drax',
          'Rocket Raccoon',
          'Groot',
          'Nebula',
          'Mantis',
          'Nick Fury',
          'Loki',
          'Wong',
          'Shuri',
          'Okoye',
          'Valkyrie',
          'Korg',
        ];

        const characterPromises = mcuCharacters.map(async (name) => {
          const response = await fetch(
            `https://gateway.marvel.com/v1/public/characters?name=${encodeURIComponent(name)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
          );
          const data = await response.json();
          if (data.data && data.data.results && data.data.results.length > 0) {
            const char = data.data.results[0];
            if (char.thumbnail && char.thumbnail.path && !char.thumbnail.path.includes('image_not_available')) {
              return char;
            }
          }
          return null;
        });

        const charactersData = await Promise.all(characterPromises);
        const validCharacters = charactersData.filter((char) => char !== null);

        // Remove duplicates based on character ID
        const uniqueCharacters = [];
        const seenIds = new Set();
        for (const char of validCharacters) {
          if (!seenIds.has(char.id)) {
            seenIds.add(char.id);
            uniqueCharacters.push(char);
          }
        }

        console.log('All fetched characters:', charactersData.map(char => char ? { id: char.id, name: char.name } : null));
        console.log('Unique characters:', uniqueCharacters.map(char => ({ id: char.id, name: char.name })));

        if (uniqueCharacters.length >= 6) {
          const shuffled = uniqueCharacters.sort(() => Math.random() - 0.5);
          setAllCharacters(shuffled);
          setCharacters(shuffled.slice(0, 6));
        } else {
          setError('Not enough valid MCU characters found');
          setHasMore(false);
        }
      } catch (err) {
        setError('Failed to fetch Marvel characters');
        console.error(err);
        setHasMore(false);
      } finally {
        setIsApiLoading(false);
      }
    };

    fetchMarvelCharacters();

    return () => {
      clearTimeout(spiralTimer);
    };
  }, []);

  // Fetch character-related comic images for the modal
  useEffect(() => {
    const fetchCharacterImages = async () => {
      if (!selectedCharacter) {
        setCharacterImages([]);
        return;
      }

      try {
        const ts = new Date().getTime().toString();
        const publicKey = '718d54c4c2e49d1f6dbc080a9c0d39d9';
        const privateKey = 'f2e198b40ff123cbf0a408f2fa95d971e7433be5';
        const hash = md5(ts + privateKey + publicKey);

        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${selectedCharacter.id}/comics?limit=4&ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        const data = await response.json();

        if (data.data && data.data.results && data.data.results.length > 0) {
          const comics = data.data.results;
          const images = comics
            .map((comic) => {
              if (comic.thumbnail && comic.thumbnail.path && !comic.thumbnail.path.includes('image_not_available')) {
                return `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`;
              }
              return null;
            })
            .filter((img) => img !== null);

          // If fewer than 4 images, use the character's thumbnail as a fallback
          while (images.length < 4) {
            images.push(`${selectedCharacter.thumbnail.path}/portrait_incredible.${selectedCharacter.thumbnail.extension}`);
          }

          setCharacterImages(images.slice(0, 4));
        } else {
          // Fallback to character's thumbnail if no comics found
          const fallbackImage = `${selectedCharacter.thumbnail.path}/portrait_incredible.${selectedCharacter.thumbnail.extension}`;
          setCharacterImages([fallbackImage, fallbackImage, fallbackImage, fallbackImage]);
        }
      } catch (err) {
        console.error('Failed to fetch character comics:', err);
        const fallbackImage = `${selectedCharacter.thumbnail.path}/portrait_incredible.${selectedCharacter.thumbnail.extension}`;
        setCharacterImages([fallbackImage, fallbackImage, fallbackImage, fallbackImage]);
      }
    };

    fetchCharacterImages();
  }, [selectedCharacter]);

  // Scroll observer for loading more characters when the last card is visible
  useEffect(() => {
    if (!lastCardRef.current || !hasMore || isApiLoading || searchQuery) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const currentCharacterIds = new Set(characters.map((c) => c.id));
          const availableCharacters = allCharacters.filter((c) => !currentCharacterIds.has(c.id));

          if (availableCharacters.length > 0) {
            const newCharacters = availableCharacters
              .sort(() => Math.random() - 0.5)
              .slice(0, Math.min(3, availableCharacters.length));
            setCharacters((prev) => [...prev, ...newCharacters]);
            if (availableCharacters.length <= 3) {
              setHasMore(false);
            }
          } else {
            setHasMore(false);
          }
        }
      },
      {
        threshold: 0.5,
        rootMargin: '50px',
      }
    );

    observer.observe(lastCardRef.current);

    return () => {
      if (lastCardRef.current) {
        observer.unobserve(lastCardRef.current);
      }
    };
  }, [characters, allCharacters, isApiLoading, hasMore, searchQuery]);

  // Real-time search filtering
  const filteredCharacters = searchQuery
    ? allCharacters.filter((char) =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : characters;

  // Handle character card click
  const handleCardClick = (char) => {
    setSelectedCharacter(char);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  // Spiral component
  const SpiralLoader = () => {
    const N = 600;
    const SIZE = 400;
    const DOT_RADIUS = 2;
    const MARGIN = 2;
    const DURATION = 3;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const CENTER = SIZE / 2;
    const MAX_RADIUS = CENTER - MARGIN - DOT_RADIUS;

    const circles = Array.from({ length: N }, (_, i) => {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_RADIUS;
      const theta = idx * GOLDEN_ANGLE;
      const x = Number((CENTER + r * Math.cos(theta)).toFixed(2));
      const y = Number((CENTER + r * Math.sin(theta)).toFixed(2));

      return (
        <circle key={i} cx={x} cy={y} r={DOT_RADIUS}>
          <animate
            attributeName="r"
            values={`${DOT_RADIUS * 0.5};${DOT_RADIUS * 1.5};${DOT_RADIUS * 0.5}`}
            dur={`${DURATION}s`}
            begin={`${frac * DURATION}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          />
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur={`${DURATION}s`}
            begin={`${frac * DURATION}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          />
        </circle>
      );
    });

    return (
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {circles}
      </svg>
    );
  };

  return (
    <div className={`main-container ${isSpiralLoading || isApiLoading ? 'loading' : 'loaded'}`}>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Image
              src={logo}
              alt="Marvel Logo"
              className="marvel-logo"
              width={120}
              height={40}
              priority
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item" >
                <a className="nav-link" href="#anime">Anime</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#disney">Disney</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#comics">Comics</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#movies">Movies</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#games">Games</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isSpiralLoading || isApiLoading ? (
        <div className="spiral-container">
          <SpiralLoader />
        </div>
      ) : (
        <div className="container-fluid content-container">
          <div className="row g-4 align-items-start">
            <div className="col-md-6 character-section">
              <div className="search-bar mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for a Marvel hero..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {error ? (
                <p className="error text-light text-center mt-4">{error}</p>
              ) : filteredCharacters.length > 0 ? (
                <div className="row g-4">
                  {filteredCharacters.map((char, index) => (
                    <div key={char.id} className="col-12 col-sm-6">
                      <div
                        className="card character-card bg-dark text-light"
                        ref={searchQuery ? null : index === characters.length - 1 ? lastCardRef : null}
                        style={{ animationDelay: `${index * 0.2}s` }}
                        onClick={() => handleCardClick(char)}
                        role="button"
                      >
                        <Image
                          src={`${char.thumbnail.path}/standard_fantastic.${char.thumbnail.extension}`}
                          alt={char.name || 'Marvel Character'}
                          className="card-img-top character-image"
                          width={200}
                          height={300}
                          quality={100}
                          priority={index < 6}
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title character-name">{char.name}</h5>
                          <p className="character-description">
                            {characterDescriptions[char.name] || 'A heroic figure in the MCU.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results text-center">
                  <h3 className="text-light">No Heroes Found!</h3>
                  <p className="text-light mt-2">
                    Looks like this hero is on a secret mission. Try searching for another Marvel character!
                  </p>
                </div>
              )}
              {!searchQuery && !hasMore && !error && characters.length >= 6 && (
                <p className="end-message text-light text-center mt-4">
                  No more heroes to see! Check back for more Marvel adventures!
                </p>
              )}
            </div>
            <div className="col-md-6 gallery-section">
              <div className="animated-gallery">
                <div className="gallery-image"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for character movie details */}
      {selectedCharacter && (
        <div
          className="modal character-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="characterModalLabel"
          aria-hidden="false"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="characterModalLabel">
                  {selectedCharacter.name}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-4 align-items-center">
                  <div className="col-md-4 text-center">
                    <Image
                      src={`${selectedCharacter.thumbnail.path}/standard_fantastic.${selectedCharacter.thumbnail.extension}`}
                      alt={selectedCharacter.name || 'Marvel Character'}
                      className="modal-character-image"
                      width={200}
                      height={300}
                      quality={100}
                    />
                  </div>
                  <div className="col-md-8">
                    <h6 className="text-light mb-3">Appeared in Movies:</h6>
                    {characterMovies[selectedCharacter.name] && characterMovies[selectedCharacter.name].length > 0 ? (
                      <ul className="movie-list">
                        {characterMovies[selectedCharacter.name].map((movie, index) => (
                          <li key={index} className="movie-item" style={{ '--index': index }}>
                            <span className="movie-title">{movie.title}</span> ({movie.year}) - {movie.role}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-light">No movie appearances found for this character.</p>
                    )}
                    {/* HD Images Section */}
                    <h6 className="text-light mt-5 mb-3">Gallery:</h6>
                    {characterImages.length > 0 ? (
                      <div className="row g-3">
                        {characterImages.map((image, index) => (
                          <div key={index} className="col-6 col-md-3">
                            <Image
                              src={image}
                              alt={`${selectedCharacter.name} Image ${index + 1}`}
                              className="modal-gallery-image"
                              width={150}
                              height={200}
                              quality={100}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-light">Loading images...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedCharacter && <div className="modal-backdrop custom-backdrop"></div>}
    </div>
  );
}