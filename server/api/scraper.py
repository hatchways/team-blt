from bs4 import BeautifulSoup
import requests, json, re
 
# Function to extract Product Title
def get_title(soup):
     
    try:
        # Outer Tag Object
        title = soup.find("span", attrs={"id":'productTitle'})
 
        # Inner NavigableString Object
        title_value = title.string
 
        # Title as a string value
        title_string = title_value.strip()
 
        # # Printing types of values for efficient understanding
        # print(type(title))
        # print(type(title_value))
        # print(type(title_string))
        # print()
 
    except AttributeError:
        title_string = ""   
 
    return title_string

# Function to extract Product ID
def get_id(soup):
 
    try:
        id = soup.find("div", attrs={'id':['averageCustomerReviews']}).get('data-asin')
 
    except:
        id = ""  
 
    return id

# Function to extract Product Price
def get_price(soup):
 
    try:
        price = soup.find("span", attrs={'id':['priceblock_saleprice', 'priceblock_ourprice', 'priceblock_dealprice', 'priceblock_saleprice', 'price', 'buyNewSection']}).string.strip()
 
    except AttributeError:
        price = ""  
 
    return price

# Function to extract Product image url
def get_image(soup):
    
    try:
        image = soup.find("img", attrs={'id':'landingImage'}).get('data-a-dynamic-image')
        
    except AttributeError:
        image = ""  
    
    #image is a string of object which contain images of different sizes, converting string into json object and then iterating to get first image
    return next(iter(json.loads(image)))
    #return image
 
# Function to generate short Amazon URL
def get_short_URL(URL, product_id):
    url_match = re.search(r"amazon((?:\.[a-z]+)+)\/", URL)
    extension = url_match.group(1).strip('.')
    link = "https://amazon.{}/dp/{}".format(extension, product_id)
    return link   

class ScrapeAmazon: 
    def __init__(self, URL):
    
        # Headers for request
        HEADERS = ({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
            "Pragma": "no-cache"})
    
        # The webpage URL
        #URL = "https://www.amazon.in/gp/product/B085J1X78K/?th=1"
    
        # HTTP Request
        webpage = requests.get(URL, headers=HEADERS)

        # Soup Object containing all data
        soup = BeautifulSoup(webpage.content, "lxml")

        #Local Variables
        short_URL = get_short_URL(URL, get_id(soup))
        id = get_id(soup)
        name = get_title(soup)
        image = get_image(soup)
        price = float(get_price(soup)[5:].replace(',',''))

        # Function calls to display all necessary product information
        #print("Product ID =", id)
        #print("Product URL =", short_URL)
        #print("Product Title =", name)
        #print("Product Price =", price)
        #print("Product Image =", image)

        
        
        self.short_URL = short_URL  
        self.id = id
        self.name = name
        self.image = image
        self.price = price

        
