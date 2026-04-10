jest.mock('./parse', () => {
  const mQuery = {
    equalTo: jest.fn().mockReturnThis(),
    first: jest.fn(),
    find: jest.fn(),
  };

  const mObject = {
    extend: jest.fn(() => function () {
      return {
        set: jest.fn(),
        save: jest.fn(),
      };
    }),
  };

  return {
    Object: mObject,
    Query: jest.fn(() => mQuery),
    User: {
      current: jest.fn(() => ({ id: 'user1' })),
    },
  };
});

const { saveFavorite } = require('./favoritos');
const Parse = require('./parse');

describe('saveFavorite', () => {

  test('deve salvar filme novo', async () => {
    Parse.Query().first.mockResolvedValue(null);

    const result = await saveFavorite({
      id: 1,
      title: "Filme A",
      poster_path: "/img.jpg"
    });

    expect(result).toBe(true);
  });

  test('não deve salvar filme duplicado', async () => {
    Parse.Query().first.mockResolvedValue({}); // já existe

    const result = await saveFavorite({ id: 1 });

    expect(result).toBe(false);
  });

  test('deve retornar false em erro', async () => {
    Parse.Query().first.mockRejectedValue(new Error("erro"));

    const result = await saveFavorite({ id: 1 });

    expect(result).toBe(false);
  });

});

const { getFavorites } = require('./favoritos');

describe('getFavorites', () => {

  test('deve retornar lista de favoritos', async () => {
    const mockData = [
      {
        get: (field) => {
          if (field === "movieId") return 1;
          if (field === "title") return "Filme A";
          if (field === "posterPath") return "/img.jpg";
        }
      }
    ];

    const Parse = require('./parse');
    Parse.Query().find.mockResolvedValue(mockData);

    const result = await getFavorites();

    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Filme A");
  });

  test('deve retornar lista vazia em erro', async () => {
    const Parse = require('./parse');
    Parse.Query().find.mockRejectedValue(new Error());

    const result = await getFavorites();

    expect(result).toEqual([]);
  });

});

const { removeFavorite } = require('./favoritos');

describe('removeFavorite', () => {

  test('deve remover favorito existente', async () => {
    const mockDestroy = jest.fn();

    const Parse = require('./parse');
    Parse.Query().first.mockResolvedValue({
      destroy: mockDestroy
    });

    const result = await removeFavorite(1);

    expect(result).toBe(true);
    expect(mockDestroy).toHaveBeenCalled();
  });

  test('deve retornar false se não encontrar', async () => {
    const Parse = require('./parse');
    Parse.Query().first.mockResolvedValue(null);

    const result = await removeFavorite(1);

    expect(result).toBe(false);
  });

  test('deve retornar false em erro', async () => {
    const Parse = require('./parse');
    Parse.Query().first.mockRejectedValue(new Error());

    const result = await removeFavorite(1);

    expect(result).toBe(false);
  });

});