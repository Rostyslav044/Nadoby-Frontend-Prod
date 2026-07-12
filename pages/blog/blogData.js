



import React from 'react';

export const BLOG_CONTENT = {
  ua: {
    title: "Корисні поради та ідеї для вашої подорожі",
    posts: [
      {
        title: "Як уникнути шахрайства при оренді",
        content: "7 золотих правил безпечної угоди від експертів NaDoby",
        image: "/scams.png",
        category: "Безпека",
        link: "/blog/scams"
      },
      {
        title: "Квартири подобово для комфортного відпочинку",
        content: "Як вибрати ідеальну квартиру для короткострокової оренди",
        image: "/apartment.png",
        category: "Квартири",
        link: "/blog/apartmentGuide"
      },
      {
        title: "Готелі з особливою атмосферою",
        content: "На що звертати увагу при виборі готельного номеру",
        image: "/hotel.png",
        category: "Готелі",
        link: "/blog/hotelGuide"
      },
      {
        title: "Готелі для тварин з турботою",
        content: "Як обрати найкращий готель для вашого улюбленця",
        image: "/animal.png",
        category: "Готелі для тварин",
        link: "/blog/petHotelGuide"
      },
      {
        title: "Хостели – бюджетно та весело!",
        content: "Чому хостели - це не просто дешевий варіант",
        image: "/hostel.png",
        category: "Хостели",
        link: "/blog/hostelGuide"
      },
      {
        title: "Будинки для відпочинку",
        content: "Переваги оренди приватного будинку перед готелем",
        image: "/house.png",
        category: "Будинки",
        link: "/blog/houseGuide"
      },
      {
        title: "Сауни/Бані для здоров'я",
        content: "Як правильно відпочивати у сауні для максимальної користі",
        image: "/sauna.png",
        category: "Сауни/Бані",
        link: "/blog/saunaGuide"
      },
      {
        title: "Бази відпочинку серед природи",
        content: "Як провести час на базі відпочинку з максимальною користю",
        image: "/camp.png",
        category: "Бази відпочинку",
        link: "/blog/campGuide"
      },
      {
        title: "Глемпінг - комфорт серед природи",
        content: "Топ незвичайних глемпінг локацій в Україні",
        image: "/glamping.png",
        category: "Глемпінг",
        link: "/blog/glampingGuide"
      },
      {
        title: "Пансіонати з лікувальними програмами",
        content: "Як вибрати пансіонат з максимальною користю для здоров'я",
        image: "/pansionat.png",
        category: "Пансіонати",
        link: "/blog/sanatoriumGuide"
      },
      {
        title: "Котеджні містечка для великих компаній",
        content: "Переваги оренди цілого комплексу для сімейних свят",
        image: "/kotedzi.png",
        category: "Котеджі",
        link: "/blog/cottageComplexGuide"
      },
      {
        title: "Коворкінг - робочі простори",
        content: "Ідеальні умови для digital-кочівників та фрілансерів",
        image: "/kavorking.png",
        category: "Коворкінг",
        link: "/blog/coworkingGuide"
      },
      {
        title: "Автокемпінги для мандрівників",
        content: "Найкращі місця для автотуристів по всій Україні",
        image: "/avtokemping.png",
        category: "Автокемпінг",
        link: "/blog/autocampingGuide"
      }
    ]
  },
  ru: {
    title: "Полезные советы и идеи для вашего путешествия",
    posts: [
      {
        title: "Как избежать мошенничества при аренде",
        content: "7 золотых правил безопасной сделки от экспертов NaDoby",
        image: "/scams.png",
        category: "Безопасность",
        link: "/blog/scams"
      },
      {
        title: "Квартиры посуточно для комфортного отдыха",
        content: "Как выбрать идеальную квартиру для краткосрочной аренды",
        image: "/apartment.png",
        category: "Квартиры",
        link: "/blog/apartmentGuide"
      },
      {
        title: "Отели с особой атмосферой",
        content: "На что обращать внимание при выборе гостиничного номера",
        image: "/hotel.png",
        category: "Отели",
        link: "/blog/hotelGuide"
      },
      {
        title: "Отели для животных с заботой",
        content: "Как выбрать лучший отель для вашего любимца",
        image: "/animal.png",
        category: "Отель для животных",
        link: "/blog/petHotelGuide"
      },
      {
        title: "Хостелы – бюджетно и весело!",
        content: "Почему хостелы - это не просто дешевый вариант",
        image: "/hostel.png",
        category: "Хостелы",
        link: "/blog/hostelGuide"
      },
      {
        title: "Дома для отдыха",
        content: "Преимущества аренды частного дома перед отелем",
        image: "/house.png",
        category: "Дома",
        link: "/blog/houseGuide"
      },
      {
        title: "Сауны/Бани для здоровья",
        content: "Как правильно отдыхать в сауне для максимальной пользы",
        image: "/sauna.png",
        category: "Сауны/Бани",
        link: "/blog/saunaGuide"
      },
      {
        title: "Базы отдыха на природе",
        content: "Как провести время на базе отдыха с максимальной пользой",
        image: "/camp.png",
        category: "Туризм",
        link: "/blog/campGuide"
      },
      {
        title: "Глэмпинг - комфорт среди природы",
        content: "Топ необычных глэмпинг локаций в Украине",
        image: "/glamping.png",
        category: "Глэмпинг",
        link: "/blog/glampingGuide"
      },
      {
        title: "Пансионаты с лечебными программами",
        content: "Как выбрать пансионат с максимальной пользой для здоровья",
        image: "/pansionat.png",
        category: "Пансионаты",
        link: "/blog/sanatoriumGuide"
      },
      {
        title: "Коттеджные городки для больших компаний",
        content: "Преимущества аренды целого комплекса для семейных праздников",
        image: "/kotedzi.png",
        category: "Коттеджи",
        link: "/blog/cottageComplexGuide"
      },
      {
        title: "Коворкинг - рабочие пространства с проживанием",
        content: "Идеальные условия для digital-кочевников и фрилансеров",
        image: "/kavorking.png",
        category: "Коворкинги",
        link: "/blog/coworkingGuide"
      },
      {
        title: "Автокемпинги для путешественников",
        content: "Лучшие места для автотуристов по всей Украине",
        image: "/avtokemping.png",
        category: "Автокемпинг",
        link: "/blog/autocampingGuide"
      }
    ]
  }
};

// Функция для статической генерации данных блога
export async function getStaticBlogData() {
  try {
    // Здесь можно добавить запросы к API для получения данных блога
    // которые будут встроены в статическую страцию
    
    return {
      blogData: BLOG_CONTENT,
      generatedAt: new Date().toISOString(),
      // Дополнительные данные которые могут приходить с сервера
      seoData: {
        title: "Блог NaDoby - Корисні поради для подорожей",
        description: "Експертні поради з оренди житла, безпеки та комфортного відпочинку",
        keywords: "оренда, квартири, готелі, подорожі, поради"
      }
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      blogData: BLOG_CONTENT,
      generatedAt: new Date().toISOString(),
      seoData: {}
    };
  }
}

// Функция для получения конкретного поста по slug
export async function getBlogPostBySlug(slug, language = 'ua') {
  const { blogData } = await getStaticBlogData();
  const posts = blogData[language]?.posts || [];

  return posts.find(post => {
    // Извлекаем slug из ссылки (убираем /blog/)
    const postSlug = post.link.replace('/blog/', '');
    return postSlug === slug;
  }) || null;
}

// Функция для получения всех постов определенной категории
export async function getBlogPostsByCategory(category, language = 'ua') {
  const { blogData } = await getStaticBlogData();
  const posts = blogData[language]?.posts || [];

  return posts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

// Функция для статической генерации всех путей постов
export async function getAllBlogPostPaths() {
  const { blogData } = await getStaticBlogData();
  const paths = [];

  // Генерируем пути для всех языков и всех постов
  Object.keys(blogData).forEach(language => {
    blogData[language].posts.forEach(post => {
      const slug = post.link.replace('/blog/', '');
      paths.push({
        params: { slug },
        locale: language
      });
    });
  });

  return paths;
}

// УДАЛЕНО: Основная функция getStaticProps для страниц блога
// УДАЛЕНО: Функция для получения статических путей

// React компонент - default export
const BlogDataPage = () => {
  const [blogData, setBlogData] = React.useState(BLOG_CONTENT);
  const [loading, setLoading] = React.useState(false);

  // Загрузка данных при монтировании компонента
  React.useEffect(() => {
    const loadBlogData = async () => {
      setLoading(true);
      try {
        const data = await getStaticBlogData();
        setBlogData(data.blogData);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h1>Blog Data Management</h1>
        <p>Loading blog data...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Blog Data Management</h1>
      <p><strong>Generated at:</strong> {new Date().toLocaleString()}</p>
      
      <div>
        <h2>All Blog Content</h2>
        {Object.entries(blogData).map(([language, data]) => (
          <div key={language} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3 style={{ color: '#333', borderBottom: '2px solid #007acc', paddingBottom: '5px' }}>
              Language: {language.toUpperCase()}
            </h3>
            <h4 style={{ color: '#666', margin: '10px 0' }}>{data.title}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
              {data.posts.map((post, index) => (
                <div 
                  key={index} 
                  style={{ 
                    border: '1px solid #eee', 
                    padding: '15px', 
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => {
                    // Навигация к посту
                    window.location.href = post.link;
                  }}
                >
                  <h5 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{post.title}</h5>
                  <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#555' }}>{post.content}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      backgroundColor: '#e3f2fd', 
                      color: '#1976d2', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '12px', color: '#888' }}>
                      Link: {post.link}
                    </span>
                  </div>
                  {post.image && (
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        style={{ 
                          maxWidth: '100%', 
                          height: 'auto',
                          borderRadius: '4px'
                        }} 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: '#e8f5e8', 
        border: '1px solid #4caf50',
        borderRadius: '5px'
      }}>
        <h3>Blog Data Functions</h3>
        <p>This page provides utility functions for blog data management:</p>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>getStaticBlogData()</strong> - Fetches all blog data</li>
          <li><strong>getBlogPostBySlug(slug, language)</strong> - Gets post by slug</li>
          <li><strong>getBlogPostsByCategory(category, language)</strong> - Gets posts by category</li>
          <li><strong>getAllBlogPostPaths()</strong> - Generates all post paths for static generation</li>
        </ul>
      </div>
    </div>
  );
};

export default BlogDataPage;