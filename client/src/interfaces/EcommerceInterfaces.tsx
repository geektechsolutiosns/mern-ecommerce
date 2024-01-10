export interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
    handleLogout : () => void;
    isLoggedin : boolean;
  }

export interface NavType {
    path: string;
    title: string;
}

export interface NavLinkType {
    navLinks: NavType[];
}

export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    latest: boolean;
    category: string;
    thumbnail: string;
    images: string[];
  }

  export interface dataType {
    success : boolean;
    message : string;
    product : Product;
  }
  
  
export interface CartState {
  cartItems: Product[];
  cartTotal: number;
  cartNumber: number;
 
}